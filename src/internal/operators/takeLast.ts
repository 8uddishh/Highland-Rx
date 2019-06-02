import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";

class TakeLastOpr<T> implements Operatable<T, T> {
  private _source: Highland.Stream<T>;
  private _count: number;

  constructor(source: Highland.Stream<T>, count: number) {
    this._source = source;
    this._count = count;
  }

  stream$(): Highland.Stream<T> {
    let takeable: T[] = [];
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        // next();
      } else if (x === H.nil) {
        takeable.forEach(y => {
          push(null, y);
        });
        push(null, H.nil);
      } else {
        takeable.push(x as T);
        if (takeable.length > this._count) {
          takeable.shift();
        }
        next();
      }
    });
  }
}

export function takeLast<T> (count: number):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new TakeLastOpr(stream, count);
    return operator.stream$();
  }
}