import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";

class TapOpr<T> implements Operatable<T, T> {
  private _source: Highland.Stream<T>;
  private _nextOrObserver: (x: T) => void;
  private _error: (x: any) => void;
  private _complete: () => void;

  constructor(source: Highland.Stream<T>, nextOrObserver: (x: T) => void,
  error?: (e: any) => void,
  complete?: () => void) {
    this._source = source;
    this._nextOrObserver = nextOrObserver;
    this._error = error;
    this._complete = complete;
  }

  stream$(): Highland.Stream<T> {
    return this._source.consume((err, x, push, next) => {
      if (err) {
        if (this._error) {
          this._error(err)
        }
        push(err);
        next();
      } else if (x === H.nil) {
        if (this._complete) {
          this._complete();
        }
        push(null, x);
      } else {
        this._nextOrObserver(x as T)
        push(null, x);
        next();
      }
    });
  }
}

export function tap<T> ( nextOrObserver: (x: T) => void,
error?: (e: any) => void,
complete?: () => void):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new TapOpr(stream, nextOrObserver, error, complete);
    return operator.stream$();
  }
}