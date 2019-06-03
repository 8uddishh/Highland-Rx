import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";

class TakeWhileOpr<T> implements Operatable<T, T> {
  private _source: Highland.Stream<T>;
  private _predicate: (value: T, index: number) => boolean;
  private _inclusive: boolean;
  private _index = 0;

  constructor(source: Highland.Stream<T>, predicate: (value: T, index: number) => boolean, inclusive:boolean = false) {
    this._source = source;
    this._predicate = predicate;
    this._inclusive = inclusive;
  }

  stream$(): Highland.Stream<T> {
    let found = false;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        push(null, x);
      } else if (this._predicate(x as T, this._index++)) {
        found = true;
        push(null, x);
        next();
      } else if (found) {
        if (this._inclusive) {
          push(null, x);
        }
        push(err, H.nil);
      } else {
        next();
      }
    });
  }
}

export function takeWhile<T> (predicate: (value: T, index: number) => boolean, inclusive:boolean = false):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new TakeWhileOpr(stream, predicate, inclusive);
    return operator.stream$();
  }
}