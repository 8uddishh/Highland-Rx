import H from "highland";
import { Operatable } from "../types";
import { pluckDeep } from "../utils/object-utils";

class PluckOpr<T, R> implements Operatable<T, R> {
  _source: Highland.Stream<T>;
  _properties: string[];
  constructor(source: Highland.Stream<T>, ...properties: string[]) {
    this._source = source;
    this._properties = properties;
  }

  stream$(): Highland.Stream<any> {
    return this._source.consume((err, x, push, next) => {
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        push(err, x);
      } else if (typeof x === 'object') {
        const [first, ...rest] = this._properties;
        push(null, pluckDeep(first, ...rest)(x));
        next();
      } else {
        push(new Error(`Expected Object, got ${(typeof x)}`));
        next();
      }
    });
  }
}

export function pluck<T, R> (...properties: string[]):(stream:Highland.Stream<T>) => Highland.Stream<R> {
  return (stream:Highland.Stream<T>) => {
    const operator = new PluckOpr(stream, ...properties);
    return operator.stream$();
  }
}