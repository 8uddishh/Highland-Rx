# distinctUntilChanged
### signature: distinctUntilChanged(compare: function): Observable
Only emit when the current value is different than the last.

# Examples
## Example 1: distinctUntilChanged with basic values
```javascript
import { from } from '../../highland-rx';
import { distinctUntilChanged } from '../../highland-rx/operators';

// only output distinct values, based on the last emitted value
const source$ = from([1, 1, 2, 2, 3, 3]);

source$
  .pipe(distinctUntilChanged())
  // output: 1,2,3
  .subscribe(console.log);
```

## Example 2: distinctUntilChanged with objects
```javascript
import { from } from '../../highland-rx';
import { distinctUntilChanged } from '../../highland-rx/operators';
// Objects must be same reference
const source1$ = from([sampleObject, sampleObject, sampleObject]);

// only emit distinct objects, based on last emitted value
source1$
  .pipe(distinctUntilChanged())
  // output: {name: 'Test'}
  .subscribe(console.log);
```

## Example 3: Using custom comparer function
```javascript
import { from } from '../../highland-rx';
import { distinctUntilChanged } from '../../highland-rx/operators';
// only output distinct values, based on the last emitted value
const source2$ = from([
  { name: 'Brian' },
  { name: 'Joe' },
  { name: 'Joe' },
  { name: 'Sue' },
]);

source2$
  // custom compare for name
  .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
  // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
  .subscribe(console.log);
```