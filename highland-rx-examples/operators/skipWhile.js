import { interval } from '../../dist';
import { skipWhile } from '../../dist/operators';

// import { interval } from '../../highland-rx';
// import { skipWhile } from '../../highland-rx/operators';

// emit every 1s
const source = interval(1000);
// skip emitted values from source while value is less than 5
const example = source.pipe(skipWhile(val => val < 5));
// output: 5...6...7...8........
example.subscribe(val => console.log(val));
