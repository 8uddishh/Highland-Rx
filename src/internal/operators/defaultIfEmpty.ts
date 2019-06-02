import H from "highland";
import { Operatable } from "../types";

class DefaultIfEmptyOpr<T, R> implements Operatable<T, T | R> {
  _source: Highland.Stream<T>;
  _defaultValue: R;
  constructor(source: Highland.Stream<T>, defaultValue: R = null) {
    this._source = source;
    this._defaultValue = defaultValue;
  }

  stream$(): Highland.Stream<T | R> {
    let ifAnyPush = false;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        if (!ifAnyPush) {
          push(null, this._defaultValue);
        }
        push(null, x);
      } else {
        ifAnyPush = true;
        push(null, x);
        next();
      }
    });
  }
}

export function defaultIfEmpty<T,R> (defaultValue: R = null):(stream:Highland.Stream<T>) => Highland.Stream<T | R> {
  return (stream:Highland.Stream<T>) => {
    const operator = new DefaultIfEmptyOpr(stream, defaultValue);
    return operator.stream$();
  }
}