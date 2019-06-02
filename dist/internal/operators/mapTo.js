import { Observable } from "../../internal/Observable";
import { map } from './map';
class MapToOpr {
    constructor(source, value) {
        this._source = source;
        this._value = value;
    }
    stream$() {
        const map$ = new Observable(this._source).pipe(map(() => this._value));
        return map$.asStream();
    }
}
export function mapTo(value) {
    return (stream) => {
        const operator = new MapToOpr(stream, value);
        return operator.stream$();
    };
}
