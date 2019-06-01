import H from "highland";
import { Operatable } from "../types";

class MapOpr<T, R> implements Operatable<T, R> {
  _source: Highland.Stream<T>;
  _selector: (value: T | Highland.Nil, index: number) => R;
  constructor(source: Highland.Stream<T>, selector: (value: T | Highland.Nil, index: number) => R) {
    this._source = source;
    this._selector = selector;
  }

  stream$(): Highland.Stream<R> {
    let index = 0;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        // next();
      } else if (x === H.nil) {
        push(null, H.nil);
      } else {
        push(null, this._selector(x, index));
        index++;
        next();
      }
    });
  }
}

export function map<T,R> (project: (value: T | Highland.Nil, index: number) => R):(stream:Highland.Stream<T>) => Highland.Stream<R> {
  return (stream:Highland.Stream<T>) => {
    const operator = new MapOpr(stream, project);
    return operator.stream$();
  }
}