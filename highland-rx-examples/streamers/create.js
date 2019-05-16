import { Observable } from '../../highland-rx';

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
