import H from 'highland';
import { Observable } from '../Observable';

export function range(start: number = 0, count?: number,): Observable<number> {
  function* generator(start: number, count: number) {
    let index = 0;
    let current = start;
    for (let i = index; i <= count; i++) {
      yield current++;
    }
  }
  return new Observable<number>(H((push) => {
    let res = generator(start, count).next();
    while (!res.done) {
      push(null, res.value);
      res = generator(start, count).next();
    } 
    push(null, H.nil);
  }));
} 