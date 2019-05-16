import { of } from '../../highland-rx';

// emits any number of provided values in sequence
const source = of(1, 2, 3, 4, 5);
// output: 1,2,3,4,5
source.subscribe(val => console.log(val));

// emits values of any type
// eslint-disable-next-line prefer-arrow-callback
const source2 = of({ name: 'Brian' }, [1, 2, 3], function hello() {
  return 'Hello';
});
source2.subscribe(val => console.log(val));
