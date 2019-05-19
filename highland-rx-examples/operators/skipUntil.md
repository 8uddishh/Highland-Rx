# skipUntil
### signature: skipUntil(the: Observable): Observable
> Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.

# Examples
## Example 1: Skip until observable emits
```javascript
import { interval, timer } from 'highland-rx';
import { skipUntil } from 'highland-rx/operators';

// emit every 1s
const source = interval(1000);
// skip emitted values from source until inner observable emits (6s)
const example = source.pipe(skipUntil(timer(6000)));
// output: 5...6...7...8........
example.subscribe(val => console.log(val));

```

