import H from "highland";
class DistinctUntilChangedOpr {
    constructor(source, compare, keySelector) {
        this._source = source;
        this._compare = compare;
        this._keySelector = keySelector;
    }
    stream$() {
        let lastValue = null;
        let firstTime = true;
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                next();
            }
            else if (x === H.nil) {
                push(null, x);
            }
            else {
                if (!this._compare && (firstTime || x !== lastValue)) {
                    lastValue = !this._keySelector ? x : this._keySelector(x);
                    firstTime = false;
                    push(null, x);
                }
                if (this._compare && (firstTime || !this._compare(lastValue, !this._keySelector ? x : this._keySelector(x)))) {
                    lastValue = !this._keySelector ? x : this._keySelector(x);
                    firstTime = false;
                    push(null, x);
                }
                next();
            }
        });
    }
}
export function distinctUntilChanged(compare, keySelector) {
    return (stream) => {
        const operator = new DistinctUntilChangedOpr(stream, compare, keySelector);
        return operator.stream$();
    };
}
