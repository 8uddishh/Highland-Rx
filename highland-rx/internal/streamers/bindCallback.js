import H from 'highland';
import { Observable } from '../Observable';
export function bindCallback(callbackFunc) {
    return (...args) => new Observable(H.wrapCallback(callbackFunc)(args));
}
