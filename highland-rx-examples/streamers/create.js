import axios from 'axios';
import { Observable } from '../../dist';
import { map } from '../../dist/operators';

// import axios from 'axios';
// import { Observable } from '../../highland-rx';
// import { map } from '../../highland-rx/operators';

/*
  Create an observable that emits 'Hello' and 'World' on
  subscription.
*/
const hello = Observable.create((observer) => {
  observer.next('Hello');
  observer.next('World');
  observer.complete();
});

// output: 'Hello'...'World'
hello.subscribe(val => console.log(val));

/*
  Increment value every 1s, emit even numbers.
*/
const evenNumbers = Observable.create((observer) => {
  let value = 0;
  const interval = setInterval(() => {
    if (value % 2 === 0) {
      observer.next(value);
    }
    // eslint-disable-next-line no-plusplus
    value++;
  }, 1000);

  return () => clearInterval(interval);
});
// output: 0...2...4...6...8
evenNumbers.subscribe(val => console.log(val));

Observable.create((observer) => {
  axios.get('https://swapi.co/api/people/3').then((res) => {
    observer.next(res);
    observer.complete();
  }).catch((err) => {
    observer.error(err);
  });
}).pipe(
  map(({ data }) => data),
).subscribe(console.log, console.log, () => {
  console.log('Finish stream');
});
