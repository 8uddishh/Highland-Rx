# audit
### auditTime(duration: number, scheduler?: Scheduler): Observable
> Ignores source values for duration milliseconds, then emits the most recent value from the source Observable, then repeats this process.

# Why use auditTime
When you are interested in ignoring a source observable for a given amout of time, you can use auditTime. A possible use case is to only emit certain events (i.e. mouse clicks) at a maximum rate per second. After the specified duration has passed, the timer is disabled and the most recent source value is emitted on the output Observable, and this process repeats for the next source value.

# Examples
## Example 1: Emit clicks at a rate of at most one click per second
```javascript
import { interval } from 'highland-rx';
import { auditTime } from 'highland-rx/operators';

const arr$ = interval(1000);
const result = arr$.pipe(auditTime(1000));
result.subscribe(x => console.log(x));
```