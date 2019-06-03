import H from "highland";
class SkipWhileOpr {
    constructor(source, predicate) {
        this._source = source;
        this._predicate = predicate;
    }
    stream$() {
        let match = false;
        let index = 0;
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                next();
            }
            else if (x === H.nil) {
                push(null, x);
            }
            else if (!this._predicate(x, index)) {
                match = true;
                push(null, x);
                next();
            }
            else if (match) {
                push(null, x);
                push(err, H.nil);
            }
            else {
                next();
            }
            // eslint-disable-next-line no-plusplus
            index++;
        });
    }
}
export function skipWhile(predicate) {
    return (stream) => {
        const operator = new SkipWhileOpr(stream, predicate);
        return operator.stream$();
    };
}
