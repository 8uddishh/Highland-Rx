import H from "highland";
import { Operatable } from "../types";

class DelayOpr<T> implements Operatable<T, T> {
  _source: Highland.Stream<T>;
  _delay: number;
  constructor(source: Highland.Stream<T>, delay: number) {
    this._source = source;
    this._delay = delay;
  }

  stream$(): Highland.Stream<T> {
    return this._source.consume((err, x, push, next) => {
      let streamComplete = false;
      if (err) {
        push(err);
        next();
      } else if (x === H.nil) {
        streamComplete = true;
      } else {
        setTimeout(() => {
          push(null, x);
          if (streamComplete) {
            push(null, H.nil);
          }
        }, this._delay);
        next();
      }
    });
  }
}

export function delay<T> (delay: number):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new DelayOpr(stream, delay);
    return operator.stream$();
  }
}