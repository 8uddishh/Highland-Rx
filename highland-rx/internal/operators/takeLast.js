import H from "highland";
class TakeLastOpr {
    constructor(source, count) {
        this._source = source;
        this._count = count;
    }
    stream$() {
        let takeable = [];
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                // next();
            }
            else if (x === H.nil) {
                takeable.forEach(y => {
                    push(null, y);
                });
                push(null, H.nil);
            }
            else {
                takeable.push(x);
                if (takeable.length > this._count) {
                    takeable.shift();
                }
                next();
            }
        });
    }
}
export function takeLast(count) {
    return (stream) => {
        const operator = new TakeLastOpr(stream, count);
        return operator.stream$();
    };
}
