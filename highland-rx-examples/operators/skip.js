import { interval, from } from '../../dist';
import { skip, filter, observe } from '../../dist/operators';

// import { interval, from } from '../../highland-rx';
// import { skip, filter, observe } from '../../highland-rx/operators';

// emit every 1s
const source = interval(1000);
// skip the first 5 emitted values
const example = source.pipe(skip(5));
// output: 5...6...7...8........
example.subscribe(val => console.log(val));

const numArrayObs = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 3,4,5...
numArrayObs.pipe(observe(), skip(2)).subscribe(console.log);

// 3,4,5...
numArrayObs
  .pipe(observe(), filter((val, index) => index > 1))
  .subscribe(console.log);

numArrayObs.subscribe();
