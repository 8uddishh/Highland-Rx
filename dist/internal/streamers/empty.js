import H from 'highland';
import { Observable } from '../Observable';
export function empty() {
    return new Observable(H([]));
}
