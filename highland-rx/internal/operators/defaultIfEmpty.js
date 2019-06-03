import H from "highland";
class DefaultIfEmptyOpr {
    constructor(source, defaultValue = null) {
        this._source = source;
        this._defaultValue = defaultValue;
    }
    stream$() {
        let ifAnyPush = false;
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                next();
            }
            else if (x === H.nil) {
                if (!ifAnyPush) {
                    push(null, this._defaultValue);
                }
                push(null, x);
            }
            else {
                ifAnyPush = true;
                push(null, x);
                next();
            }
        });
    }
}
export function defaultIfEmpty(defaultValue = null) {
    return (stream) => {
        const operator = new DefaultIfEmptyOpr(stream, defaultValue);
        return operator.stream$();
    };
}
