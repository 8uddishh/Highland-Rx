import H from 'highland';
import { Observable } from '../Observable';
export function range(start = 0, count) {
    return new Observable(H((push) => {
        let index = 0;
        let current = start;
        for (let i = index; i < count; i++) {
            push(null, current);
            current++;
        }
        push(null, H.nil);
    }));
}
