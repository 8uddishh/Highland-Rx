# bufferTime
### signature: bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, scheduler: Scheduler): Observable
> Buffers the source Observable values for a specific time period.

# Examples
## Example 1: Buffer for 2 seconds
```javascript
import { interval } from 'highland-rx';
import { bufferTime } from 'highland-rx/operators';

// Create an observable that emits a value every 500ms
const source = interval(500);
// After 2 seconds have passed, emit buffered values as an array
const example = source.pipe(bufferTime(2000));
// Print values to console
// ex. output [0,1,2]...[3,4,5,6]
example.subscribe(val => console.log('Buffered with Time:', val));
```

## Example 2: Multiple active buffers
```javascript
import { interval } from 'highland-rx';
import { bufferTime } from 'highland-rx/operators';

//Create an observable that emits a value every 500ms
const source = interval(500);
/*
bufferTime also takes second argument, when to start the next buffer (time in ms)
for instance, if we have a bufferTime of 2 seconds but second argument (bufferCreationInterval) of 1 second:
ex. output: [0,1,2]...[1,2,3,4,5]...[3,4,5,6,7]
*/
const example = source.pipe(bufferTime(2000, 1000));
//Print values to console
example.subscribe(val =>
  console.log('Start Buffer Every 1s:', val)
);
```