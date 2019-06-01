import { interval } from '../../dist';
import { audit } from '../../dist/operators';

// import { interval } from '../../highland-rx';
// import { audit } from '../../highland-rx/operators';

const arr$ = interval(1000);
const result = arr$.pipe(audit(() => interval(2000)));
result.subscribe(x => console.log(x));
