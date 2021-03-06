import H from 'highland';
import { Observable } from '../Observable';

export function range(start: number = 0, count?: number,): Observable<number> {
  return new Observable<number>(H((push) => {
    let index = 0;
    let current = start;
    for (let i = index; i < count; i++) {
      push(null, current);
      current++;
    }
    push(null, H.nil);
  }));
} 