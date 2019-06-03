import { Observable } from "../../internal/Observable";
import { filter } from './filter';
import { defaultIfEmpty } from './defaultIfEmpty';
import { takeLast } from './takeLast';
import { throwIfEmpty } from './throwIfEmpty';
class LastOpr {
    constructor(source, predicate, defaultValue) {
        this._source = source;
        this._predicate = predicate;
        this._defaultValue = defaultValue;
    }
    stream$() {
        if (!this._predicate) {
            this._predicate = () => true;
        }
        const first$ = new Observable(this._source).pipe(filter(this._predicate), takeLast(1), this._defaultValue ? defaultIfEmpty(this._defaultValue) : throwIfEmpty(() => new Error('no elements in sequence')));
        return first$.asStream();
    }
}
export function last(predicate, defaultValue) {
    return (stream) => {
        const operator = new LastOpr(stream, predicate, defaultValue);
        return operator.stream$();
    };
}
