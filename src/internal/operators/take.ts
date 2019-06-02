import H from "highland";
import { Operatable } from "../types";

class TakeOpr<T> implements Operatable<T, T> {
  private _index: number = 0;
  private _source: Highland.Stream<T>;
  private _count: number;

  constructor(source: Highland.Stream<T>, count: number) {
    this._source = source;
    this._count = count;
  }

  stream$(): Highland.Stream<T> {
    return this._source.take(this._count);
  }
}

export function take<T> (count: number):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new TakeOpr(stream, count);
    return operator.stream$();
  }
}