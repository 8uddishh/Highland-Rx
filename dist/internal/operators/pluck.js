import H from "highland";
import { pluckDeep } from "../utils/object-utils";
class PluckOpr {
    constructor(source, ...properties) {
        this._source = source;
        this._properties = properties;
    }
    stream$() {
        return this._source.consume((err, x, push, next) => {
            if (err) {
                push(err);
                next();
            }
            else if (x === H.nil) {
                push(err, x);
            }
            else if (typeof x === 'object') {
                const [first, ...rest] = this._properties;
                push(null, pluckDeep(first, ...rest)(x));
                next();
            }
            else {
                push(new Error(`Expected Object, got ${(typeof x)}`));
                next();
            }
        });
    }
}
export function pluck(...properties) {
    return (stream) => {
        const operator = new PluckOpr(stream, ...properties);
        return operator.stream$();
    };
}
