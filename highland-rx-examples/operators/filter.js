import { from, interval } from '../../dist';
import { filter } from '../../dist/operators';

// import { from, interval } from '../../highland-rx';
// import { filter } from '../../highland-rx/operators';

// emit ({name: 'Joe', age: 31}, {name: 'Bob', age:25})
const source = from([{ name: 'Joe', age: 31 }, { name: 'Bob', age: 25 }]);
// filter out people with age under 30
const example = source.pipe(filter(person => person.age >= 30));
// output: "Over 30: Joe"
example.subscribe(val => console.log(`Over 30: ${val.name}`));

// emit every second
const source1 = interval(1000);
// filter out all values until interval is greater than 5
const example1 = source1.pipe(filter(num => num > 5));
/*
  "Number greater than 5: 6"
  "Number greater than 5: 7"
  "Number greater than 5: 8"
  "Number greater than 5: 9"
*/
example1.subscribe((val) => {
  console.log(`Number greater than 5: ${val}`);
});
