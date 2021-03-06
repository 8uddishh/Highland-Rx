import H from 'highland';
import { Observable } from '../Observable';

export function timer(dueTime: number = 0, period?: number): Observable<number> {
  return new Observable<number>(H((push) => {
    let tick = 0;
    setTimeout(() => {
      push(null, tick);
      // eslint-disable-next-line no-plusplus
      tick++;
      if (period) {
        setInterval(() => {
          push(null, tick);
          // eslint-disable-next-line no-plusplus
          tick++;
        }, period);
      } else {
        push(null, H.nil);
      }
    }, dueTime);
  }));
} 