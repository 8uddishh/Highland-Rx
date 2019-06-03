import { of } from '../../highland-rx';
import { every } from '../../highland-rx/operators';

// emit 5 values
const allEvens = of(1, 2, 4, 6, 8, 10);
const example = allEvens.pipe(
  // is every value even?
  every(val => val % 2 === 0),
);
// output: false
example.subscribe(val => console.log(val));


// emit 5 values
const allEvens2 = of(2, 4, 6, 8, 10);
const example2 = allEvens2.pipe(
  // is every value even?
  every(val => val % 2 === 0),
);
// output: true
example2.subscribe(val => console.log(val));
