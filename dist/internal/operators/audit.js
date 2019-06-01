import H from "highland";
class AuditOpr {
    constructor(source, durationSelector) {
        this._source = source;
        this._durationSelector = durationSelector;
    }
    stream$() {
        let currentValue = null;
        let lowerObsEmitted = false;
        let paused = false;
        let currentObservable = null;
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                // next();
            }
            else if (x === H.nil) {
                push(new Error('Cannot use audit inside a cold Observable'));
                push(null, H.nil);
            }
            else {
                currentValue = x;
                if (currentObservable && lowerObsEmitted) {
                    // currentObservable.destroy();
                    currentObservable = null;
                    lowerObsEmitted = false;
                    push(null, currentValue);
                }
                else if (!currentObservable) {
                    currentObservable = this._durationSelector(currentValue);
                    currentObservable.subscribe(() => {
                        lowerObsEmitted = true;
                        currentObservable.pause();
                    });
                }
                next();
            }
        });
    }
}
export function audit(durationSelector) {
    return (stream) => {
        const operator = new AuditOpr(stream, durationSelector);
        return operator.stream$();
    };
}
