import { Observer, Subscribable, Unsubscribable, Destroyable, Pausable } from "./types";
import H from "highland";
import { Pipeable, Operator } from "./operators/types";

export class Observable<T> implements Subscribable<T>, Pipeable<T>, Destroyable, Pausable {

  _source: Highland.Stream<T>;

  constructor(source: Highland.Stream<T>) {
    this._source = source;
  }

  static create: Function = <T>(subscribe?: (observer: Observer<T>) => void) => {
    const pusher = (push: (err: Error, x?: T | Highland.Nil) => void, next: () => void):Observer<T> => ({
      next: (x:T) => {
        push(null, x);
        next();
      },
      error: (err) => {
        push(err);
        next();
      },
      complete: () => {
        push(null, H.nil);
      },
    });
    let obs:Observer<T> = null;
    const stream = H<T>((push, next) => {
      if (!obs) {
        obs = pusher(push, next);
        subscribe(obs);
      }
    });
    return new Observable<T>(stream);
  }

  subscribe(next?: (value: T | Highland.Nil) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable {
    const s = this._source.consume((e, x, p, n) => {
      if (e) {
        if (error) {
          error(e);
          if (complete) {
            complete();
          }
        } else {
          this._source.emit('error', e);
        }
      } else if (x === H.nil) {
        p(null, H.nil);
        if (complete) {
          complete();
        }
      } else {
        if (next) {
          next(x);
        }
        n();
      }
    });
    s.resume();

    return {
      unsubscribe: () => {
        this._source.destroy();
      }
    }
  }

  pipe<R>(first: Operator<any, any>, ...rest:Operator<any, any>[]): Subscribable<R> {
    const stream$ = new Observable(first(this._source));
    if (!rest || rest.length === 0) {
      return stream$;
    }

    if (rest.length > 1) {
      const [ next, ...after ] = rest;
      return stream$.pipe(next, ...after);
    }

    return stream$.pipe(rest[0]);
  }

  destroy(): void {
    this._source.destroy();
  }

  resume(): void {
    this._source.resume();
  }
  
  pause(): void {
    this._source.pause();
  }

  asStream(): Highland.Stream<T> {
    return this._source;
  }
}