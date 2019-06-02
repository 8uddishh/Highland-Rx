import { of, merge, range } from '../../dist';
import { mapTo, delay, observe } from '../../dist/operators';

// import { of, merge, range } from '../../highland-rx';
// import { mapTo, delay, observe } from '../../highland-rx/operators';

// emit one item
const example = of(null);
// delay output of each by an extra second
const message = merge(
  example.pipe(mapTo('Hello')),
  example.pipe(
    observe(),
    mapTo('World!'),
    delay(1000),
  ),
  example.pipe(
    observe(),
    mapTo('Goodbye'),
    delay(2000),
  ),
  example.pipe(
    observe(),
    mapTo('World!'),
    delay(3000),
  ),
);

message.subscribe(val => console.log(val));

// emit 1 - 9 after 1 second
range(1, 9).pipe(
  delay(1000),
).subscribe(console.log);
