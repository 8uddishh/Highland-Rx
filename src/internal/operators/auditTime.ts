import H from "highland";
import { Operatable } from "../types";
import { Observable } from "../../internal/Observable";
import { audit } from './audit';
import { interval } from './../streamers/interval';

class AuditTimeOpr<T> implements Operatable<T, T> {
  _source: Highland.Stream<T>;
  _duration: number;
  constructor(source: Highland.Stream<T>, duration: number) {
    this._source = source;
    this._duration = duration;
  }

  stream$(): Highland.Stream<any> {
    const auditor$ = new Observable(this._source).pipe(
      audit(() => interval(this._duration))
    );
    return auditor$.asStream();
  }
}

export function auditTime<T,R> (duration: number):(stream:Highland.Stream<T>) => Highland.Stream<T> {
  return (stream:Highland.Stream<T>) => {
    const operator = new AuditTimeOpr(stream, duration);
    return operator.stream$();
  }
}