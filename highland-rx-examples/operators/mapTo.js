import { interval } from '../../highland-rx';
import { mapTo } from '../../highland-rx/operators';

// emit value every two seconds
const source = interval(2000);
// map all emissions to one value
const example = source.pipe(mapTo('HELLO WORLD!'));
// output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
example.subscribe(val => console.log(val));
