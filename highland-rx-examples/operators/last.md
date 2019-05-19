# last
### signature: last(predicate: function): Observable
Emit the last value emitted from source on completion, based on provided expression.

# Examples
## Example 1: Last value in sequence
```javascript
import { from } from 'highland-rx';
import { last } from 'highland-rx/operators';

const source = from([1, 2, 3, 4, 5]);
//no arguments, emit last value
const example = source.pipe(last());
//output: "Last value: 5"
example.subscribe(val => console.log(`Last value: ${val}`));
```

## Example 2: First value to pass predicate
```javascript
import { from } from 'highland-rx';
import { last } from 'highland-rx/operators';

const source = from([1, 2, 3, 4, 5]);
//emit last even number
const exampleTwo = source.pipe(last(num => num % 2 === 0));
//output: "Last to pass test: 4"
exampleTwo.subscribe(val =>
  console.log(`Last to pass test: ${val}`)
);
```

## Example 3: Last with default value
```javascript
import { from } from 'highland-rx';
import { last } from 'highland-rx/operators';

const source = from([1, 2, 3, 4, 5]);
//no values will pass given predicate, emit default
const exampleTwo = source.pipe(last(v => v > 5, 'Nothing!'));
//output: 'Nothing!'
exampleTwo.subscribe(val => console.log(val));
```