# skipWhile
### signature: skipWhile(predicate: Function): Observable
> Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds true, but emits all further source items as soon as the condition becomes false.

# Examples
## Example 1: Skip while values below threshold
```javascript
import { interval } from 'highland-rx';
import { skipWhile } from 'highland-rx/operators';

// emit every 1s
const source = interval(1000);
// skip emitted values from source while value is less than 5
const example = source.pipe(skipWhile(val => val < 5));
// output: 5...6...7...8........
example.subscribe(val => console.log(val));
```

