import H from 'highland';
import { Observable } from '../Observable';
export function from(input) {
    return (typeof input !== 'string') ? new Observable(H(input)) : new Observable(H(input.split('')));
}
