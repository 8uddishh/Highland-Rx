import { Observable } from "../../internal/Observable";
import { from } from './../streamers/from';
import { merge } from './../streamers/merge';
class StartWithOpr {
    constructor(source, ...array) {
        this._source = source;
        this._array = array;
    }
    stream$() {
        return merge(from(this._array), new Observable(this._source)).asStream();
    }
}
export function startWith(...array) {
    return (stream) => {
        const operator = new StartWithOpr(stream, ...array);
        return operator.stream$();
    };
}
