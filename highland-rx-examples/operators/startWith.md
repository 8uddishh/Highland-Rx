# startWith
### signature: startWith(an: Values): Observable
Emit given value first.

# Examples
## Example 1: startWith on number sequence
```javascript
import { of } from 'highland-rx';
import { startWith } from 'highland-rx/operators';

// emit (1,2,3)
const source = of(1, 2, 3);
// start with 0
const example = source.pipe(startWith(0));
// output: 0,1,2,3
example.subscribe(val => console.log(val));
```

## Example 2: startWith multiple values
```javascript
import { interval } from 'highland-rx';
import { filter } from 'highland-rx/operators';

// emit values in sequence every 1s
const source = interval(5000);
// start with -3, -2, -1
const example = source.pipe(startWith(-3, -2, -1));
// output: -3, -2, -1, 0, 1, 2....
example.subscribe(val => console.log(val));
```
