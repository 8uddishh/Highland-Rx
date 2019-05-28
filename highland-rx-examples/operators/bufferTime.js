import { interval, from } from '../../highland-rx';
import { bufferTime } from '../../highland-rx/operators';

// Create an observable that emits a value every 500ms
const source = interval(500);
// After 2 seconds have passed, emit buffered values as an array
const example = source.pipe(bufferTime(2000));
// Print values to console
// ex. output [0,1,2]...[3,4,5,6]
example.subscribe(val => console.log('Buffered with Time:', val));


// Create an observable that emits a value every 500ms
const source2 = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// After 2 seconds have passed, emit buffered values as an array
const example2 = source2.pipe(bufferTime(2000));
// Print values to console
// ex. output [0,1,2]...[3,4,5,6]
example2.subscribe(val => console.log('Buffered with Time:', val));

// Create an observable that emits a value every 500ms
const source3 = interval(500);
/*
bufferTime also takes second argument, when to start the next buffer (time in ms)
for instance, if we have a bufferTime of 2 seconds but second argument
(bufferCreationInterval) of 1 second:
ex. output: [0,1,2]...[1,2,3,4,5]...[3,4,5,6,7]
*/
const example3 = source3.pipe(bufferTime(5000, 1000));
// Print values to console
example3.subscribe(val => console.log('Start Buffer Every 1s:', val));
