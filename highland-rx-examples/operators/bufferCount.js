import { interval } from '../../dist';
import { bufferCount, batch } from '../../dist/operators';

// import { interval } from '../../highland-rx';
// import { bufferCount, batch } from '../../highland-rx/operators';

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


const source1 = interval(1000);
const bufferEveryOne = source1.pipe(bufferCount(3, 1));
// Print values to console
// Start Buffer Every 1: [ 0, 1, 2 ]
// Start Buffer Every 1: [ 1, 2, 3 ]
// Start Buffer Every 1: [ 2, 3, 4 ]
bufferEveryOne.subscribe((val) => {
  console.log('Start Buffer Every 1:', val);
});

const source2 = interval(1000);
const bufferEveryOne2 = source2.pipe(batch(3, 5));
// Print values to console
// Start Buffer Every 1: [ 0, 1, 2 ]
// Start Buffer Every 1: [ 5, 6, 7 ]
// Start Buffer Every 1: [ 10, 11, 12 ]
bufferEveryOne2.subscribe((val) => {
  console.log('Start Buffer Every 1:', val);
});
