import H from 'highland';
import { Observable } from '../Observable';
export function merge(...observables) {
    const streams = observables.map(x => x.asStream());
    return new Observable(H(streams).merge());
}
