import { from } from '../../dist';
import { last } from '../../dist/operators';

// import { from } from '../../highland-rx';
// import { last } from '../../highland-rx/operators';

const source = from([1, 2, 3, 4, 5]);
// no arguments, emit last value
const example = source.pipe(last());
// output: "Last value: 5"
example.subscribe(val => console.log(`Last value: ${val}`));

const source1 = from([1, 2, 3, 4, 5]);
// emit last even number
const exampleTwo = source1.pipe(last(num => num % 2 === 0));
// output: "Last to pass test: 4"
exampleTwo.subscribe((val) => {
  console.log(`Last to pass test: ${val}`);
});


const source2 = from([1, 2, 3, 4, 5]);
// no values will pass given predicate, emit default
const exampleTwo2 = source2.pipe(last(v => v > 5, 'Nothing!'));
// output: 'Nothing!'
exampleTwo2.subscribe(val => console.log(val));
