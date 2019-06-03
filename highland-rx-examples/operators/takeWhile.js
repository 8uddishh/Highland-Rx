import { of } from '../../dist';
import { takeWhile, filter, observe } from '../../dist/operators';

// import { of } from '../../highland-rx';
// import { takeWhile, filter, observe } from '../../highland-rx/operators';

// emit 1,2,3,4,5
const source$ = of(1, 2, 3, 4, 5);

// allow values until value from source is greater than 4, then complete
source$
  .pipe(takeWhile(val => val <= 4))
  // log: 1,2,3,4
  .subscribe(val => console.log(val));


const source1$ = of(1, 2, 3, 9);

source1$
  // with inclusive flag, the value causing the predicate to return false will also be emitted
  .pipe(takeWhile(val => val <= 3, true))
  // log: 1, 2, 3, 9
  .subscribe(console.log);

// emit 3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3
const source2$ = of(3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);

// allow values until value from source equals 3, then complete
source2$
  .pipe(
    observe(),
    takeWhile(it => it === 3),
  )
  // log: 3, 3, 3
  .subscribe(val => console.log('takeWhile', val));

source2$
  .pipe(
    observe(),
    filter(it => it === 3),
  )
  // log: 3, 3, 3, 3, 3, 3, 3
  .subscribe(val => console.log('filter', val));

source2$.subscribe();
