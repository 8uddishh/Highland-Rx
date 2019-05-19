# audit
### signature: audit(durationSelector: (value) => Observable | Promise): Observable
> Ignores source values for a duration determined by another Observable, then emits the most recent value from the source Observable, then repeats this process.

# Examples
## Example 1: Default for empty value
```javascript
import { interval } from 'highland-rx';
import { audit } from 'highland-rx/operators';

const arr$ = interval(1000);
const result = arr$.pipe(audit(() => interval(2000)));
result.subscribe(x => console.log(x));
```