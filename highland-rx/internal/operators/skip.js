import H from "highland";
class SkipOpr {
    constructor(source, count) {
        this._source = source;
        this._count = count;
    }
    stream$() {
        let skipCount = 0;
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                push(null, H.nil);
            }
            else if (x === H.nil) {
                push(null, H.nil);
            }
            else if (skipCount < this._count) {
                skipCount++;
                next();
            }
            else {
                push(null, x);
                next();
            }
        });
    }
}
export function skip(count) {
    return (stream) => {
        const operator = new SkipOpr(stream, count);
        return operator.stream$();
    };
}
