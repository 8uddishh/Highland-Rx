import { interval, timer } from '../../dist';
import { takeUntil } from '../../dist/operators';

// import { interval, timer } from '../../highland-rx';
// import { takeUntil } from '../../highland-rx/operators';

// emit value every 1s
const source = interval(1000);
// after 5 seconds, emit value
const timer$ = timer(5000);
// when timer emits after 5s, complete source
const example = source.pipe(takeUntil(timer$));
// output: 0,1,2,3
example.subscribe(val => console.log(val), (err) => {
  console.log('Error occured');
  console.log(err);
}, () => {
  console.log('Finished');
});
