import H from "highland";
class ThrowIfEmptyOpr {
    constructor(source, errorFactory) {
        this._source = source;
        this._errorFactory = errorFactory;
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
                    push(this._errorFactory());
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
export function throwIfEmpty(errorFactory) {
    return (stream) => {
        const operator = new ThrowIfEmptyOpr(stream, errorFactory);
        return operator.stream$();
    };
}
