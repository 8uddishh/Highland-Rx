import H from "highland";
import { Operatable } from "../types";

class FilterOpr<T> implements Operatable<T, T> {
  private _index: number = 0;
  _source: Highland.Stream<T>;
  _predicate: (value: T, index: number) => boolean;
  constructor(source: Highland.Stream<T>, predicate:(value: T, index: number) => boolean) {
    this._source = source;
    this._predicate = predicate;
  }

  stream$(): Highland.Stream<T> {
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        push(err, x);
      } else {
        let fnVal: boolean; let fnErr: any;
        try {
          fnVal = this._predicate(x as T, this._index);
        } catch (e) {
          fnErr = e;
        }
        if (fnErr) {
          push(fnErr);
        } else if (fnVal) {
          push(null, x);
        }
        // eslint-disable-next-line no-plusplus
        this._index++;
        next();
      }
    });
  }
}

export function filter<T> (predicate:(value: T, index: number) => boolean):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new FilterOpr(stream, predicate);
    return operator.stream$();
  }
}