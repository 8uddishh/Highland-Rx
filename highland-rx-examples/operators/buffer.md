# buffer
### signature: buffer(closingNotifier: Observable): Observable
> Buffers the source Observable values until closingNotifier emits.

# Examples
## Example 1: Buffers and emits at a rate of at most one per three seconds
```javascript
import { interval } from 'highland-rx';
import { buffer, map } from 'highland-rx/operators';

const arr$ = interval(1000).pipe(map(x => `Timer ${x}`));
const result = arr$.pipe(buffer(interval(3000)));

// [ 'Timer 0', 'Timer 1' ]
// [ 'Timer 2', 'Timer 3', 'Timer 4' ]
// [ 'Timer 5', 'Timer 6', 'Timer 7' ]
// [ 'Timer 8', 'Timer 9', 'Timer 10' ]
// [ 'Timer 11', 'Timer 12', 'Timer 13' ]
result.subscribe(x => console.log(x));
```