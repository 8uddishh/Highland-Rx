import H from 'highland';
import { Observable } from '../Observable';

export function merge<T, R>(...observables: Observable<any>[]): Observable<R> {
  const streams = observables.map(x => x.asStream());
  return new Observable(H(streams).merge());
} 