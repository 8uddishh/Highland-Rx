import { from } from '../../dist';
import { first } from '../../dist/operators';

// import { from } from '../../highland-rx';
// import { first } from '../../highland-rx/operators';

const source = from([1, 2, 3, 4, 5]);
// no arguments, emit first value
const example = source.pipe(first());
// output: "First value: 1"
example.subscribe(val => console.log(`First value: ${val}`));

const source1 = from([1, 2, 3, 4, 5]);
// emit first item to pass test
const example1 = source1.pipe(first(num => num === 5));
// output: "First to pass test: 5"
example1.subscribe((val) => {
  console.log(`First to pass test: ${val}`);
});

const source2 = from([1, 2, 3, 4, 5]);
// no value will pass, emit default
const example2 = source2.pipe(first(val => val > 5, 'Nothing'));
// output: 'Nothing'
example2.subscribe(val => console.log(val));
