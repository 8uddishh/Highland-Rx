import H from "highland";
class TakeWhileOpr {
    constructor(source, predicate, inclusive = false) {
        this._index = 0;
        this._source = source;
        this._predicate = predicate;
        this._inclusive = inclusive;
    }
    stream$() {
        let found = false;
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                next();
            }
            else if (x === H.nil) {
                push(null, x);
            }
            else if (this._predicate(x, this._index++)) {
                found = true;
                push(null, x);
                next();
            }
            else if (found) {
                if (this._inclusive) {
                    push(null, x);
                }
                push(err, H.nil);
            }
            else {
                next();
            }
        });
    }
}
export function takeWhile(predicate, inclusive = false) {
    return (stream) => {
        const operator = new TakeWhileOpr(stream, predicate, inclusive);
        return operator.stream$();
    };
}
