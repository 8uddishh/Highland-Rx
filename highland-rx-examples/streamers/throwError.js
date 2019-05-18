import { throwError } from '../../highland-rx';

// emits an error with specified value on subscription
const source = throwError('This is an error!');
// output: 'Error: This is an error!'
source.subscribe(val => console.log(val),
  val => console.log(`Error: ${val}`),
  () => console.log('Complete!'));
