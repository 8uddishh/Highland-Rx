import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";
import { filter } from './filter';
import { defaultIfEmpty } from './defaultIfEmpty';
import { take } from './take';
import { throwIfEmpty } from './throwIfEmpty';

class FirstOpr<T, R> implements Operatable<T, T | R> {
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
      take(1),
      this._defaultValue ? defaultIfEmpty(this._defaultValue) : throwIfEmpty(() => new Error('no elements in sequence'))
    );
    return first$.asStream();
  }
}

export function first<T, R> (predicate?: (value: T, index: number) => boolean, defaultValue?: R):(stream:Highland.Stream<T>) => Highland.Stream<T | R> {
  return (stream:Highland.Stream<T>) => {
    const operator = new FirstOpr(stream, predicate, defaultValue);
    return operator.stream$();
  }
}