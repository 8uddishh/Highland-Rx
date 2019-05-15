import {
  of,
  interval,
  range,
  from,
} from './highland-rx';

import {
  map,
  mapTo,
  filter,
  tap,
  pluck,
  first,
  startWith,
} from './highland-rx/operators';

console.log('map example');
of(1, 2, 3, 4, 5).pipe(
  map(x => x * 2),
  map(x => x * 2),
  tap(console.log),
  map(x => x * 2),
  map(x => x * 10),
).subscribe(console.log, console.log, () => {
  console.log('map complete');
});

console.log('mapTo example');
interval(2000).pipe(
  mapTo({ type: 'NOTIFICATION ARRIVED' }),
).subscribe(console.log);

console.log('filter example');
range(1, 10).pipe(
  filter(x => x % 2 === 0),
).subscribe(console.log, console.log, () => {
  console.log('Filter complete');
});

console.log('pluck example');
from([
  { x: 1, y: 'test1' },
  { x: 2, y: 'test2' },
  { x: 3, y: 'test3' },
]).pipe(
  pluck('y'),
).subscribe(console.log);

console.log('first example');
const source = from([1, 2, 3, 4, 5]);
const example = source.pipe(first());
example.subscribe(val => console.log(`First value: ${val}`));
const source2 = from([1, 2, 3, 4, 5]);
const example2 = source2.pipe(first(num => num === 5));
example2.subscribe((val) => {
  console.log(`First to pass test: ${val}`);
});

console.log('startWith example');
const source3 = of(1, 2, 3);
const example3 = source3.pipe(startWith(0));
example3.subscribe(val => console.log(val));
