import H from "highland";
class EveryOpr {
    constructor(source, predicate) {
        this._index = 0;
        this._source = source;
        this._predicate = predicate;
    }
    stream$() {
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                next();
            }
            else if (x === H.nil) {
                push(null, true);
                push(null, x);
            }
            else {
                let fnVal;
                let fnErr;
                try {
                    fnVal = this._predicate(x, this._index++);
                }
                catch (e) {
                    fnErr = e;
                }
                if (fnErr) {
                    push(fnErr);
                }
                else if (!fnVal) {
                    push(null, false);
                    push(null, H.nil);
                }
                else {
                    next();
                }
            }
        });
    }
}
export function every(predicate) {
    return (stream) => {
        const operator = new EveryOpr(stream, predicate);
        return operator.stream$();
    };
}
