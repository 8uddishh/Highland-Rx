import H from "highland";
class DelayWhenOpr {
    constructor(source, delayDurationSelector) {
        this._source = source;
        this._delayDurationSelector = delayDurationSelector;
    }
    stream$() {
        let index = 0;
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                next();
            }
            else if (x === H.nil) {
                push(null, x);
            }
            else {
                this._delayDurationSelector(x, index).subscribe(() => {
                    push(null, x);
                    next();
                }, (error) => {
                    push(error);
                });
            }
        });
    }
}
export function delayWhen(delayDurationSelector) {
    return (stream) => {
        const operator = new DelayWhenOpr(stream, delayDurationSelector);
        return operator.stream$();
    };
}
