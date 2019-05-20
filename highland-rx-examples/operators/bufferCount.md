# bufferCount / batch
### signature: bufferCount(bufferSize: number, startBufferEvery: number = null): Observable
> Buffers the source Observable values until the size hits the maximum bufferSize given.

# Examples
## Example 1: Collect buffer and emit after specified number of values
```javascript
import { interval } from 'highland-rx';
import { bufferCount } from 'highland-rx/operators';

// Create an observable that emits a value every second
const source = interval(1000);
// After three values are emitted, pass on as an array of buffered values
const bufferThree = source.pipe(bufferCount(3));
// Print values to console
// Buffered Values: [ 0, 1, 2 ]
// Buffered Values: [ 3, 4, 5 ]
// Buffered Values: [ 6, 7, 8 ]
bufferThree.subscribe((val) => {
  console.log('Buffered Values:', val);
});
```

## Example 2: Overlapping buffers
```javascript
import { interval } from 'highland-rx';
import { bufferCount } from 'highland-rx/operators';

// Create an observable that emits a value every second
const source = interval(1000);
const bufferEveryOne = source.pipe(bufferCount(3, 1));
// Print values to console
// Start Buffer Every 1: [ 0, 1, 2 ]
// Start Buffer Every 1: [ 1, 2, 3 ]
// Start Buffer Every 1: [ 2, 3, 4 ]
bufferEveryOne.subscribe((val) => {
  console.log('Start Buffer Every 1:', val);
});
```

## Example 2: Overlapping buffers when startBufferEvery > bufferSize
```javascript
import { interval } from 'highland-rx';
import { batch } from 'highland-rx/operators';

// Create an observable that emits a value every second
const source = interval(1000);
const bufferEveryOne = source.pipe(batch(3, 5));
// Print values to console
// Start Buffer Every 1: [ 0, 1, 2 ]
// Start Buffer Every 1: [ 5, 6, 7 ]
// Start Buffer Every 1: [ 10, 11, 12 ]
bufferEveryOne.subscribe((val) => {
  console.log('Start Buffer Every 1:', val);
});
```