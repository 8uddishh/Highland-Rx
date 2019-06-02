import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";

class DistinctUntilChangedOpr<T, K> implements Operatable<T, T> {
  _source: Highland.Stream<T>;
  _compare: (x: T | K, y: T | K) => boolean;
  _keySelector: (x: T) => K;
  constructor(source: Highland.Stream<T>, compare?: (x: T | K, y: T | K) => boolean, keySelector?: (x: T) => K) {
    this._source = source;
    this._compare = compare;
    this._keySelector = keySelector;
  }

  stream$(): Highland.Stream<T> {
    let lastValue: T | K = null; let firstTime = true;
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        push(null, x);
      } else {
        if (!this._compare && (firstTime || x !== lastValue)) {
          lastValue = !this._keySelector ? x as T : this._keySelector(x as T);
          firstTime = false;
          push(null, x);
        }
        if (this._compare && (firstTime || !this._compare(lastValue, !this._keySelector ? x as T : this._keySelector(x as T)))) {
          lastValue = !this._keySelector ? x as T : this._keySelector(x as T);
          firstTime = false;
          push(null, x);
        }
        next();
      }
    });
  }
}

export function distinctUntilChanged<T, K> (compare?: (x: T | K, y: T | K) => boolean, keySelector?: (x: T) => K):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new DistinctUntilChangedOpr(stream, compare, keySelector);
    return operator.stream$();
  }
}