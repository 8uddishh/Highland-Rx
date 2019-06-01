import H from "highland";
import { observe } from './observe';
class BufferOpr {
    constructor(source, closingNotifier) {
        this._source = source;
        this._closingNotifier = closingNotifier;
    }
    stream$() {
        let buffer = [];
        let lowerObsEmitted = false;
        let currentObservable = null;
        this._closingNotifier.subscribe();
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                // next();
            }
            else if (x === H.nil) {
                push(new Error('Cannot use buffer inside a cold Observable'));
                push(null, H.nil);
            }
            else {
                if (currentObservable && lowerObsEmitted) {
                    currentObservable.destroy();
                    currentObservable = null;
                    lowerObsEmitted = false;
                    push(null, buffer);
                    buffer = [];
                }
                else if (!currentObservable) {
                    currentObservable = this._closingNotifier.pipe(observe());
                    currentObservable.subscribe(() => {
                        lowerObsEmitted = true;
                        currentObservable.pause();
                    });
                }
                next();
                buffer.push(x);
            }
        });
    }
}
export function buffer(closingNotifier) {
    return (stream) => {
        const operator = new BufferOpr(stream, closingNotifier);
        return operator.stream$();
    };
}
