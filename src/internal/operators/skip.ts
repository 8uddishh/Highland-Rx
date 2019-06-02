import H from "highland";
import { Operatable } from "../types";

class SkipOpr<T> implements Operatable<T, T> {
  private _source: Highland.Stream<T>;
  private _count: number;

  constructor(source: Highland.Stream<T>, count: number) {
    this._source = source;
    this._count = count;
  }

  stream$(): Highland.Stream<T> {
    let skipCount = 0;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        push(null, H.nil);
      } else if (x === H.nil) {
        push(null, H.nil);
      } else if (skipCount < this._count) {
        skipCount++;
        next();
      } else {
        push(null, x);
        next();
      }
    });
  }
}

export function skip<T> (count: number):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new SkipOpr(stream, count);
    return operator.stream$();
  }
}