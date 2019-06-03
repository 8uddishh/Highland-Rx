import { from } from '../../highland-rx';
import { distinctUntilChanged } from '../../highland-rx/operators';

// only output distinct values, based on the last emitted value
const source$ = from([1, 1, 2, 2, 3, 3]);

source$
  .pipe(distinctUntilChanged())
  // output: 1,2,3
  .subscribe(console.log);

const sampleObject = { name: 'Test' };

// Objects must be same reference
const source1$ = from([sampleObject, sampleObject, sampleObject]);

// only emit distinct objects, based on last emitted value
source1$
  .pipe(distinctUntilChanged())
  // output: {name: 'Test'}
  .subscribe(console.log);

// only output distinct values, based on the last emitted value
const source2$ = from([
  { name: 'Brian' },
  { name: 'Joe' },
  { name: 'Joe' },
  { name: 'Sue' },
]);

source2$
  // custom compare for name
  .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
  // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
  .subscribe(console.log);
