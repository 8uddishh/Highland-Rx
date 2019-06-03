import { Observable } from "../../internal/Observable";
import { audit } from './audit';
import { interval } from './../streamers/interval';
class AuditTimeOpr {
    constructor(source, duration) {
        this._source = source;
        this._duration = duration;
    }
    stream$() {
        const auditor$ = new Observable(this._source).pipe(audit(() => interval(this._duration)));
        return auditor$.asStream();
    }
}
export function auditTime(duration) {
    return (stream) => {
        const operator = new AuditTimeOpr(stream, duration);
        return operator.stream$();
    };
}
