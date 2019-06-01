import H from "highland";
import { Operatable, Subscribable, Pausable, Destroyable } from "../types";
import { Observable } from "../../internal/Observable";
import { observe } from './observe';

class BufferOpr<T> implements Operatable<T, T[]> {
  _source: Highland.Stream<T>;
  _closingNotifier: Observable<any>;
  constructor(source: Highland.Stream<T>, closingNotifier: Observable<any>) {
    this._source = source;
    this._closingNotifier = closingNotifier;
  }

  stream$(): Highland.Stream<T[]> {
    let buffer:T[] = [];
    let lowerObsEmitted = false;
    let currentObservable:Subscribable<any> = null;
    this._closingNotifier.subscribe();
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        // next();
      } else if (x === H.nil) {
        push(new Error('Cannot use buffer inside a cold Observable'));
        push(null, H.nil);
      } else {
        if (currentObservable && lowerObsEmitted) {
          (currentObservable as unknown as Destroyable).destroy();
          currentObservable = null;
          lowerObsEmitted = false;
          push(null, buffer);
          buffer = [];
        } else if (!currentObservable) {
          currentObservable = this._closingNotifier.pipe(observe());
          currentObservable.subscribe(() => {
            lowerObsEmitted = true;
            (currentObservable as unknown as Pausable).pause();
          });
        }
        next();
        buffer.push(x as T);
      }
    });
  }
}

export function buffer<T> (closingNotifier: Observable<any>):(stream:Highland.Stream<T>) => Highland.Stream<T[]> {
  return (stream:Highland.Stream<T>) => {
    const operator = new BufferOpr(stream, closingNotifier);
    return operator.stream$();
  }
}