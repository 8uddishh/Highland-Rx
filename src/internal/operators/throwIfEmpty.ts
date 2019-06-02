import H from "highland";
import { Operatable } from "../types";

class ThrowIfEmptyOpr<T> implements Operatable<T, T> {
  _source: Highland.Stream<T>;
  _errorFactory: () => Error;
  constructor(source: Highland.Stream<T>, errorFactory: () => Error) {
    this._source = source;
    this._errorFactory = errorFactory;
  }

  stream$(): Highland.Stream<T> {
    let ifAnyPush = false;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        if (!ifAnyPush) {
          push(this._errorFactory());
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

export function throwIfEmpty<T> (errorFactory: () => Error):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new ThrowIfEmptyOpr(stream, errorFactory);
    return operator.stream$();
  }
}