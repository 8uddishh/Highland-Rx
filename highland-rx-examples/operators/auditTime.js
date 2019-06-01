import { interval } from '../../dist';
import { auditTime } from '../../dist/operators';

// import { interval } from '../../highland-rx';
// import { auditTime } from '../../highland-rx/operators';

const arr$ = interval(1000);
const result = arr$.pipe(auditTime(1000));
result.subscribe(x => console.log(x));
