import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";
import { filter } from './filter';
import { defaultIfEmpty } from './defaultIfEmpty';
import { takeLast } from './takeLast';
import { throwIfEmpty } from './throwIfEmpty';

class LastOpr<T, R> implements Operatable<T, T | R> {
  private _source: Highland.Stream<T>;
  private _defaultValue: R;
  _predicate: (value: T, index: number) => boolean;
  constructor(source: Highland.Stream<T>, predicate?: (value: T, index: number) => boolean, defaultValue?: R) {
    this._source = source;
    this._predicate = predicate;
    this._defaultValue = defaultValue;
  }

  stream$(): Highland.Stream<any> {
    if (!this._predicate) {
      this._predicate = () => true;
    }
    const first$ = new Observable(this._source).pipe(
      filter(this._predicate),
      takeLast(1),
      this._defaultValue ? defaultIfEmpty(this._defaultValue) : throwIfEmpty(() => new Error('no elements in sequence'))
    );
    return first$.asStream();
  }
}

export function last<T, R> (predicate?: (value: T, index: number) => boolean, defaultValue?: R):(stream:Highland.Stream<T>) => Highland.Stream<T | R> {
  return (stream:Highland.Stream<T>) => {
    const operator = new LastOpr(stream, predicate, defaultValue);
    return operator.stream$();
  }
}