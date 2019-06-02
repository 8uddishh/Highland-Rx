import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";
import { map } from './map';

class MapToOpr<T, R> implements Operatable<T, R> {
  _source: Highland.Stream<T>;
  _value: R;
  constructor(source: Highland.Stream<T>, value: R) {
    this._source = source;
    this._value = value;
  }

  stream$(): Highland.Stream<any> {
    const map$ = new Observable(this._source).pipe(
      map(() => this._value)
    );
    return map$.asStream();
  }
}

export function mapTo<T, R> (value: R):(stream:Highland.Stream<T>) => Highland.Stream<R> {
  return (stream:Highland.Stream<T>) => {
    const operator = new MapToOpr(stream, value);
    return operator.stream$();
  }
}