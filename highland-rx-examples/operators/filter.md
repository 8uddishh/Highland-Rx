# filter
### signature: filter(select: Function, thisArg: any): Observable
> Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.

# Examples
## Example 1: filter for even numbers
```javascript
import { from } from 'highland-rx';
import { filter } from 'highland-rx/operators';

// emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
// filter out non-even numbers
const example = source.pipe(filter(num => num % 2 === 0));
// output: "Even number: 2", "Even number: 4"
example.subscribe(val => console.log(`Even number: ${val}`));
```

## Example 2: filter objects based on property
```javascript
import { of } from 'highland-rx';
import { filter } from 'highland-rx/operators';

// emit ({name: 'Joe', age: 31}, {name: 'Bob', age:25})
const source = from([{ name: 'Joe', age: 31 }, { name: 'Bob', age: 25 }]);
// filter out people with age under 30
const example = source.pipe(filter(person => person.age >= 30));
// output: "Over 30: Joe"
example.subscribe(val => console.log(`Over 30: ${val.name}`));
```

## Example 3: filter for number greater than specified value
```javascript
import { interval } from 'highland-rx';
import { filter } from 'highland-rx/operators';

// emit every second
const source = interval(1000);
// filter out all values until interval is greater than 5
const example = source.pipe(filter(num => num > 5));
/*
  "Number greater than 5: 6"
  "Number greater than 5: 7"
  "Number greater than 5: 8"
  "Number greater than 5: 9"
*/
example.subscribe((val) => {
  console.log(`Number greater than 5: ${val}`);
});
```