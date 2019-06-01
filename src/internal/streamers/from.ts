import H from 'highland';
import { Observable } from '../Observable';

export function from<T>(input: any): Observable<T> | Observable<string> {
  return (typeof input !== 'string') ? new Observable<T>(H(input)) : new Observable<string>(H(input.split('')));
} 