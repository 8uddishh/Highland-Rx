import H from 'highland';
import { Observable } from '../Observable';

export function of<T>(...args: Array<T>): Observable<T> {
  return new Observable<T>(H(args));
} 