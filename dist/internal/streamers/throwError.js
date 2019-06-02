import H from 'highland';
import { Observable } from '../Observable';
export function throwError(error) {
    return new Observable(H((push) => {
        push(error || 'Unknown error Hrx');
        push(null, H.nil);
    }));
}
