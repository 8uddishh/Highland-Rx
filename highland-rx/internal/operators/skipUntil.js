import H from "highland";
class SkipUntilOpr {
    constructor(source, notifier) {
        this._source = source;
        this._notifier = notifier;
    }
    stream$() {
        let subsciberEmitted = false;
        this._notifier.subscribe(() => {
            subsciberEmitted = true;
        });
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                push(null, H.nil);
            }
            else if (x === H.nil) {
                push(new Error('Cannot use takeUntil inside a cold Observable'));
                push(null, H.nil);
            }
            else if (subsciberEmitted) {
                push(null, x);
            }
            next();
        });
    }
}
export function skipUntil(notifier) {
    return (stream) => {
        const operator = new SkipUntilOpr(stream, notifier);
        return operator.stream$();
    };
}
