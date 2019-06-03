import H from "highland";
class FilterOpr {
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
                push(err, x);
            }
            else {
                let fnVal;
                let fnErr;
                try {
                    fnVal = this._predicate(x, this._index);
                }
                catch (e) {
                    fnErr = e;
                }
                if (fnErr) {
                    push(fnErr);
                }
                else if (fnVal) {
                    push(null, x);
                }
                // eslint-disable-next-line no-plusplus
                this._index++;
                next();
            }
        });
    }
}
export function filter(predicate) {
    return (stream) => {
        const operator = new FilterOpr(stream, predicate);
        return operator.stream$();
    };
}
