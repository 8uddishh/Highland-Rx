import H from "highland";
class DelayOpr {
    constructor(source, delay) {
        this._source = source;
        this._delay = delay;
    }
    stream$() {
        return this._source.consume((err, x, push, next) => {
            let streamComplete = false;
            if (err) {
                push(err);
                next();
            }
            else if (x === H.nil) {
                streamComplete = true;
            }
            else {
                setTimeout(() => {
                    push(null, x);
                    if (streamComplete) {
                        push(null, H.nil);
                    }
                }, this._delay);
                next();
            }
        });
    }
}
export function delay(delay) {
    return (stream) => {
        const operator = new DelayOpr(stream, delay);
        return operator.stream$();
    };
}
