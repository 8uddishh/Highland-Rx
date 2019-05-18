# delay
### signature: delay(delay: number | Date, scheduler: Scheduler): Observable
Delay emitted values by given time.

# Examples
## Example 1: Delay for increasing durations
```javascript
import { of, merge } from 'highland-rx';
import { mapTo, delay, observe } from 'highland-rx/operators';

// emit one item
const example = of(null);
// delay output of each by an extra second
const message = merge(
  example.pipe(mapTo('Hello')),
  example.pipe(
    observe(),
    mapTo('World!'),
    delay(1000),
  ),
  example.pipe(
    observe(),
    mapTo('Goodbye'),
    delay(2000),
  ),
  example.pipe(
    observe(),
    mapTo('World!'),
    delay(3000),
  ),
);

message.subscribe(val => console.log(val));
```
