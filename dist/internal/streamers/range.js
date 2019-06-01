import H from 'highland';
import { Observable } from '../Observable';
export function range(start = 0, count) {
    function* generator(start, count) {
        let index = 0;
        let current = start;
        for (let i = index; i <= count; i++) {
            yield current++;
        }
    }
    return new Observable(H((push) => {
        let res = generator(start, count).next();
        while (!res.done) {
            push(null, res.value);
            res = generator(start, count).next();
        }
        push(null, H.nil);
    }));
}
