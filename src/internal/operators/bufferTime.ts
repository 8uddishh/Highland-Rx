import H from "highland";
import { Operatable, Subscribable, Destroyable } from "../types";
import { interval } from './../streamers/interval';
import { observe } from './observe';
import { Observable } from "../../internal/Observable";

class BufferTimeOpr<T> implements Operatable<T, T[]> {
  _source: Highland.Stream<T>;
  _bufferTimeSpan: number;
  _bufferCreationInterval: number;
  constructor(source: Highland.Stream<T>, bufferTimeSpan: number, bufferCreationInterval?: number) {
    this._source = source;
    this._bufferTimeSpan = bufferTimeSpan;
    this._bufferCreationInterval = bufferCreationInterval;
  }

  stream$(): Highland.Stream<T[]> {
    const bufferInterval$ = interval(this._bufferTimeSpan);
    let streamComplete = false;
    let buffer: T[] = [];
    let firstTime = true;
    let bufferObserver: Subscribable<any> = null;
    let bufferCreationIntervalObserver: Subscribable<any>  = null;
    let bufferCreationInterval$: Observable<number> = null;
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
          bufferObserver = bufferInterval$.pipe(
            observe(),
          );
          
          bufferObserver.subscribe(() => {
            push(null, buffer);
            buffer = [];
            if (streamComplete) {
              push(null, H.nil);
              setTimeout(() => {
                (bufferObserver as unknown as Destroyable).destroy();
                bufferObserver = null;
              });
            }
          });
        } else {
          bufferObserver = bufferInterval$.pipe(
            observe(),
          );
          
          bufferObserver.subscribe(() => {
            if (firstTime) {
              const [first, ...rest] = currPosition;
              currPosition = rest;
              push(null, buffer.slice(first, buffer.length));
              firstTime = false;
            }
            setTimeout(() => {
              (bufferObserver as unknown as Destroyable).destroy();
              bufferObserver = null;
            });
          });

          if (!firstTime && !bufferCreationIntervalObserver) {
            bufferCreationIntervalObserver = bufferCreationInterval$.pipe(
              observe(),
            );
            bufferCreationIntervalObserver.subscribe(() => {
              if (streamComplete) {
                push(null, H.nil);
                setTimeout(() => {
                  (bufferCreationIntervalObserver as unknown as Destroyable).destroy();
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
      } else if (x === H.nil) {
        streamComplete = true;
      } else {
        buffer.push(x as T);
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

export function bufferTime<T> (bufferTimeSpan: number, bufferCreationInterval?: number):(stream:Highland.Stream<T>) => Highland.Stream<T[]> {
  return (stream:Highland.Stream<T>) => {
    const operator = new BufferTimeOpr(stream, bufferTimeSpan, bufferCreationInterval);
    return operator.stream$();
  }
}