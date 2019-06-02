import H from "highland";
import { Operatable } from "../types";

class EveryOpr<T> implements Operatable<T, boolean> {
  private _index: number = 0;
  _source: Highland.Stream<T>;
  _predicate: (value: T, index: number) => boolean;
  constructor(source: Highland.Stream<T>, predicate:(value: T, index: number) => boolean) {
    this._source = source;
    this._predicate = predicate;
  }

  stream$(): Highland.Stream<boolean> {
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        push(null, true);
        push(null, x);
      } else {
        let fnVal: boolean; let fnErr: any;
        try {
          fnVal = this._predicate(x as T, this._index++);
        } catch (e) {
          fnErr = e;
        }
    
        if (fnErr) {
          push(fnErr);
        } else if (!fnVal) {
          push(null, false);
          push(null, H.nil);
        } else {
          next();
        }
      }
    });
  }
}

export function every<T> (predicate:(value: T, index: number) => boolean):(stream:Highland.Stream<T>) => Highland.Stream<boolean> {
  return (stream:Highland.Stream<T>) => {
    const operator = new EveryOpr(stream, predicate);
    return operator.stream$();
  }
}