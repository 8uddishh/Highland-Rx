# first
### signature: first(predicate: function, select: function)
> Emits only the first value (or the first value that meets some condition) emitted by the source Observable.

# Examples
## Example 1: filter for even numbers
```javascript
import { from } from 'highland-rx';
import { first } from 'highland-rx/operators';

const source = from([1, 2, 3, 4, 5]);
// no arguments, emit first value
const example = source.pipe(first());
// output: "First value: 1"
example.subscribe(val => console.log(`First value: ${val}`));
```

## Example 2: First value to pass predicate
```javascript
import { from } from 'highland-rx';
import { first } from 'highland-rx/operators';

const source = from([1, 2, 3, 4, 5]);
// emit first item to pass test
const example = source.pipe(first(num => num === 5));
// output: "First to pass test: 5"
example.subscribe((val) => {
  console.log(`First to pass test: ${val}`);
});
```

## Example 3: Utilizing default value
```javascript
import { from } from 'highland-rx';
import { first } from 'highland-rx/operators';

const source2 = from([1, 2, 3, 4, 5]);
// no value will pass, emit default
const example2 = source2.pipe(first(val => val > 5, 'Nothing'));
// output: 'Nothing'
example2.subscribe(val => console.log(val));
```