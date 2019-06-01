import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";

class AuditOpr<T> implements Operatable<T, T> {
  _source: Highland.Stream<T>;
  _durationSelector: (value: T | Highland.Nil) => Observable<T> 
  constructor(source: Highland.Stream<T>, durationSelector: (value: T | Highland.Nil)=> Observable<T>) {
    this._source = source;
    this._durationSelector = durationSelector;
  }

  stream$(): Highland.Stream<T> {
    let currentValue:T | Highland.Nil = null;
    let lowerObsEmitted = false;
    let paused = false;
    let currentObservable:Observable<T> = null;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        // next();
      } else if (x === H.nil) {
        push( new Error('Cannot use audit inside a cold Observable'));
        push(null, H.nil);
      } else {
        currentValue = x;
        if (currentObservable && lowerObsEmitted) {
          currentObservable = null;
          lowerObsEmitted = false;
          push(null, currentValue);
        } else if (!currentObservable) {
          currentObservable = this._durationSelector(currentValue);
          currentObservable.subscribe(() => {
            lowerObsEmitted = true;
            currentObservable.pause();
          });
        }
        next();
      }
    });
  }
}

export function audit<T,R> (durationSelector: (value: T | Highland.Nil) => Observable<T>):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new AuditOpr(stream, durationSelector);
    return operator.stream$();
  }
}