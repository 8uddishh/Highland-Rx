import H from "highland";
import { interval } from './../streamers/interval';
import { observe } from './observe';
class BufferTimeOpr {
    constructor(source, bufferTimeSpan, bufferCreationInterval) {
        this._source = source;
        this._bufferTimeSpan = bufferTimeSpan;
        this._bufferCreationInterval = bufferCreationInterval;
    }
    stream$() {
        const bufferInterval$ = interval(this._bufferTimeSpan);
        let streamComplete = false;
        let buffer = [];
        let firstTime = true;
        let bufferObserver = null;
        let bufferCreationIntervalObserver = null;
        let bufferCreationInterval$ = null;
        let currPosition = [0];
        let shouldPush = false;
        bufferInterval$.subscribe();
        if (this._bufferCreationInterval != null) {
            bufferCreationInterval$ = interval(this._bufferCreationInterval);
            bufferCreationInterval$.subscribe(() => {
                currPosition.push(buffer.length);
            });
        }
        return this._source.consume((err, x, push, next) => {
            if (!bufferObserver) {
                if (this._bufferCreationInterval == null) {
                    bufferObserver = bufferInterval$.pipe(observe());
                    bufferObserver.subscribe(() => {
                        push(null, buffer);
                        buffer = [];
                        if (streamComplete) {
                            push(null, H.nil);
                            setTimeout(() => {
                                bufferObserver.destroy();
                                bufferObserver = null;
                            });
                        }
                    });
                }
                else {
                    bufferObserver = bufferInterval$.pipe(observe());
                    bufferObserver.subscribe(() => {
                        if (firstTime) {
                            const [first, ...rest] = currPosition;
                            currPosition = rest;
                            push(null, buffer.slice(first, buffer.length));
                            firstTime = false;
                        }
                        setTimeout(() => {
                            bufferObserver.destroy();
                            bufferObserver = null;
                        });
                    });
                    if (!firstTime && !bufferCreationIntervalObserver) {
                        bufferCreationIntervalObserver = bufferCreationInterval$.pipe(observe());
                        bufferCreationIntervalObserver.subscribe(() => {
                            if (streamComplete) {
                                push(null, H.nil);
                                setTimeout(() => {
                                    bufferCreationIntervalObserver.destroy();
                                    bufferCreationIntervalObserver = null;
                                });
                            }
                            if (!firstTime) {
                                shouldPush = true;
                            }
                        });
                    }
                }
            }
            if (err) {
                push(err);
            }
            else if (x === H.nil) {
                streamComplete = true;
            }
            else {
                buffer.push(x);
                if (shouldPush) {
                    const [first, ...rest] = currPosition;
                    currPosition = rest;
                    push(null, buffer.slice(first, currPosition[currPosition.length]));
                    shouldPush = false;
                }
                next();
            }
        });
    }
}
export function bufferTime(bufferTimeSpan, bufferCreationInterval) {
    return (stream) => {
        const operator = new BufferTimeOpr(stream, bufferTimeSpan, bufferCreationInterval);
        return operator.stream$();
    };
}
