import { of, interval } from '../../highland-rx';
import { take, map } from '../../highland-rx/operators';

// emit 1,2,3,4,5
const source = of(1, 2, 3, 4, 5);
// take the first emitted value then complete
const example = source.pipe(take(1));
// output: 1
example.subscribe(val => console.log(val));

// emit value every 1s
const interval$ = interval(1000);
// take the first 5 emitted values
const example1 = interval$.pipe(
  take(5),
  map(x => x * 2),
);
// output: 0,1,2,3,4
example1.subscribe(val => console.log(val));
