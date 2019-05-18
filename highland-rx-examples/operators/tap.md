# tap / do
### signature: tap(nextOrObserver: function, error: function, complete: function): Observable
Transparently perform actions or side-effects, such as logging.

# Examples
## Example 1: Logging with tap
```javascript
import { of } from 'highland-rx';
import { tap, map } from 'highland-rx/operators';

const source = of(1, 2, 3, 4, 5);
// transparently log values from source with 'tap'
const example = source.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`)),
);

// 'tap' does not transform values
// output: 11...12...13...14...15
example.subscribe(val => console.log(val));
```