# defaultIfEmpty
### signature: defaultIfEmpty(defaultValue: any): Observable
> Emits a given value if the source Observable completes without emitting any next value, otherwise mirrors the source Observable.

# Examples
## Example 1: Default for empty value
```javascript
import { of } from 'highland-rx';
import { defaultIfEmpty } from 'highland-rx/operators';

// emit 'Observable.of() Empty!' when empty, else any values from source
const exampleOne = of().pipe(defaultIfEmpty('Observable.of() Empty!'));
// output: 'Observable.of() Empty!'
exampleOne.subscribe(val => console.log(val));
```

## Example 2: Default for Observable.empty
```javascript
import { empty } from 'highland-rx';
import { defaultIfEmpty } from 'highland-rx/operators';

// emit 'Observable.empty()!' when empty, else any values from source
const example2 = empty().pipe(defaultIfEmpty('Observable.empty()!'));
// output: 'Observable.empty()!'
example2.subscribe(val => console.log(val));
```