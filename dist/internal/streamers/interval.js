import H from 'highland';
import { Observable } from '../Observable';
export function interval(period = 0) {
    return new Observable(H((push) => {
        let tick = 0;
        setInterval(() => {
            push(null, tick);
            tick++;
        }, period);
    }));
}
