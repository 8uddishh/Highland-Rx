import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";

class SkipWhileOpr<T> implements Operatable<T, T> {
  private _source: Highland.Stream<T>;
  private _predicate: (value: T, index: number) => boolean;

  constructor(source: Highland.Stream<T>, predicate: (value: T, index: number) => boolean) {
    this._source = source;
    this._predicate = predicate;
  }

  stream$(): Highland.Stream<T> {
    let match = false;
    let index = 0;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        push(null, x);
      } else if (!this._predicate(x as T, index)) {
        match = true;
        push(null, x);
        next();
      } else if (match) {
        push(null, x);
        push(err, H.nil);
      } else {
        next();
      }
      // eslint-disable-next-line no-plusplus
      index++;
    });
  }
}

export function skipWhile<T> (predicate: (value: T, index: number) => boolean):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new SkipWhileOpr(stream, predicate);
    return operator.stream$();
  }
}