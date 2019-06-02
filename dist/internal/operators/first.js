import { Observable } from "../../internal/Observable";
import { filter } from './filter';
import { defaultIfEmpty } from './defaultIfEmpty';
import { take } from './take';
import { throwIfEmpty } from './throwIfEmpty';
class FirstOpr {
    constructor(source, predicate, defaultValue) {
        this._source = source;
        this._predicate = predicate;
        this._defaultValue = defaultValue;
    }
    stream$() {
        if (!this._predicate) {
            this._predicate = () => true;
        }
        const first$ = new Observable(this._source).pipe(filter(this._predicate), take(1), this._defaultValue ? defaultIfEmpty(this._defaultValue) : throwIfEmpty(() => new Error('no elements in sequence')));
        return first$.asStream();
    }
}
export function first(predicate, defaultValue) {
    return (stream) => {
        const operator = new FirstOpr(stream, predicate, defaultValue);
        return operator.stream$();
    };
}
