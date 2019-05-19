# map
### signature: map(project: Function, thisArg: any): Observable
> Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.

# Examples
## Example 1: Add 10 to each number
```javascript
import { from } from 'highland-rx';
import { map } from 'highland-rx/operators';

// emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
// add 10 to each value
const example = source.pipe(map(val => val + 10));
// output: 11,12,13,14,15
example.subscribe(val => console.log(val));
```

## Example 2: Map to single property
```javascript
import { from } from 'highland-rx';
import { map } from 'highland-rx/operators';

// emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
const source = from([
  { name: 'Joe', age: 30 },
  { name: 'Frank', age: 20 },
  { name: 'Ryan', age: 50 },
]);
// grab each persons name, could also use pluck for this scenario
const example = source.pipe(map(({ name }) => name));
// output: "Joe","Frank","Ryan"
example.subscribe(val => console.log(val));
```
