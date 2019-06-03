import H from "highland";
class TapOpr {
    constructor(source, nextOrObserver, error, complete) {
        this._source = source;
        this._nextOrObserver = nextOrObserver;
        this._error = error;
        this._complete = complete;
    }
    stream$() {
        return this._source.consume((err, x, push, next) => {
            if (err) {
                if (this._error) {
                    this._error(err);
                }
                push(err);
                next();
            }
            else if (x === H.nil) {
                if (this._complete) {
                    this._complete();
                }
                push(null, x);
            }
            else {
                this._nextOrObserver(x);
                push(null, x);
                next();
            }
        });
    }
}
export function tap(nextOrObserver, error, complete) {
    return (stream) => {
        const operator = new TapOpr(stream, nextOrObserver, error, complete);
        return operator.stream$();
    };
}
