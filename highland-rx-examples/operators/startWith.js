import { of, interval } from '../../highland-rx';
import { startWith } from '../../highland-rx/operators';

// emit (1,2,3)
const source = of(1, 2, 3);
// start with 0
const example = source.pipe(startWith(0));
// output: 0,1,2,3
example.subscribe(val => console.log(val));

// emit values in sequence every 1s
const source2 = interval(1000);
// start with -3, -2, -1
const example2 = source2.pipe(startWith(-3, -2, -1));
// output: -3, -2, -1, 0, 1, 2....
example2.subscribe(val => console.log(val));
