import H from "highland";
import { Operatable } from "../types";

class ObserveOpr<T> implements Operatable<T, T> {
  _source: Highland.Stream<T>;
  constructor(source: Highland.Stream<T>) {
    this._source = source;
  }

  stream$(): Highland.Stream<T> {
    let index = 0;
    return this._source.observe();
  }
}

export function observe<T> ():(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new ObserveOpr(stream);
    return operator.stream$();
  }
}