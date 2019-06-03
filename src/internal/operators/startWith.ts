import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";
import { from } from './../streamers/from';
import { merge } from './../streamers/merge';

class StartWithOpr<T> implements Operatable<T, T> {
  private _source: Highland.Stream<T>;
  private _array: T[];

  constructor(source: Highland.Stream<T>, ...array: T[]) {
    this._source = source;
    this._array = array;
  }

  stream$(): Highland.Stream<any> {
    return merge(
      from(this._array),
      new Observable(this._source)
    ).asStream();
  }
}

export function startWith<T> (...array: T[]):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new StartWithOpr(stream, ...array);
    return operator.stream$();
  }
}