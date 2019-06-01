import H from "highland";
export class Observable {
    constructor(source) {
        this._source = source;
    }
    subscribe(next, error, complete) {
        const s = this._source.consume((e, x, p, n) => {
            if (e) {
                if (error) {
                    error(e);
                    if (complete) {
                        complete();
                    }
                }
                else {
                    this._source.emit('error', e);
                }
            }
            else if (x === H.nil) {
                p(null, H.nil);
                if (complete) {
                    complete();
                }
            }
            else {
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
        };
    }
    pipe(first, ...rest) {
        const stream$ = new Observable(first(this._source));
        if (!rest || rest.length === 0) {
            return stream$;
        }
        if (rest.length > 1) {
            const [next, ...after] = rest;
            return stream$.pipe(next, ...after);
        }
        return stream$.pipe(rest[0]);
    }
    destroy() {
        this._source.destroy();
    }
    resume() {
        this._source.resume();
    }
    pause() {
        this._source.pause();
    }
    asStream() {
        return this._source;
    }
}
Observable.create = (subscribe) => {
    const pusher = (push, next) => ({
        next: (x) => {
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
    let obs = null;
    const stream = H((push, next) => {
        if (!obs) {
            obs = pusher(push, next);
            subscribe(obs);
        }
    });
    return new Observable(stream);
};
