import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";

class DelayWhenOpr<T> implements Operatable<T, T> {
  _source: Highland.Stream<T>;
  _delayDurationSelector: (value: T, index: number) => Observable<any>;
  constructor(source: Highland.Stream<T>, delayDurationSelector: (value: T, index: number) => Observable<any>) {
    this._source = source;
    this._delayDurationSelector = delayDurationSelector;
  }

  stream$(): Highland.Stream<T> {
    let index = 0;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        push(null, x);
      } else {
        this._delayDurationSelector(x as T, index).subscribe(() => {
          push(null, x);
          next();
        }, (error) => {
          push(error);
        });
      }
    });
  }
}

export function delayWhen<T> (delayDurationSelector: (value: T, index: number) => Observable<any>):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new DelayWhenOpr(stream, delayDurationSelector);
    return operator.stream$();
  }
}