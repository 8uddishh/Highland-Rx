import H from 'highland';
import { Observable } from '../Observable';


export function empty():Observable<never> {
  return new Observable(H([]));
}