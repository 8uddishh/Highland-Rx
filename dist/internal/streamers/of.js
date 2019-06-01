import H from 'highland';
import { Observable } from '../Observable';
export function of(...args) {
    return new Observable(H(args));
}
