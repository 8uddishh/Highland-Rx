import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";

class SkipUntilOpr<T> implements Operatable<T, T> {
  private _source: Highland.Stream<T>;
  private _notifier: Observable<any>;

  constructor(source: Highland.Stream<T>, notifier: Observable<any>) {
    this._source = source;
    this._notifier = notifier;
  }

  stream$(): Highland.Stream<T> {
    let subsciberEmitted = false;
    this._notifier.subscribe(() => {
      subsciberEmitted = true;
    });
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        push(null, H.nil);
      } else if (x === H.nil) {
        push(new Error('Cannot use takeUntil inside a cold Observable'));
        push(null, H.nil);
      } else if (subsciberEmitted) {
        push(null, x);
      }
      next();
    });
  }
}

export function skipUntil<T> (notifier: Observable<any>):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new SkipUntilOpr(stream, notifier);
    return operator.stream$();
  }
}