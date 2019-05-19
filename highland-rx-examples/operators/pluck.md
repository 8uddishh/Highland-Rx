# pluck
### signature: pluck(properties: ...args): Observable
> Maps each source value (an object) to its specified nested property.

# Examples
## Example 1: Pluck object property
```javascript
import { from } from 'highland-rx';
import { pluck } from 'highland-rx/operators';

const source = from([{ name: 'Joe', age: 30 }, { name: 'Sarah', age: 35 }]);
// grab names
const example = source.pipe(pluck('name'));
// output: "Joe", "Sarah"
example.subscribe(val => console.log(val));
```

## Example 2: Pluck nested properties
```javascript
import { from } from 'highland-rx';
import { pluck } from 'highland-rx/operators';

const source = from([
  { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  // will return undefined when no job is found
  { name: 'Sarah', age: 35 },
]);
// grab title property under job
const example = source.pipe(pluck('job', 'title'));
// output: "Developer" , undefined
example.subscribe(val => console.log(val));
```
