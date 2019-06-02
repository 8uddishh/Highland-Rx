import { of } from '../../dist';
import { takeLast } from '../../dist/operators';

// import { of } from '../../highland-rx';
// import { takeLast } from '../../highland-rx/operators';

const source = of('Ignore', 'Ignore', 'Hello', 'World!');
// take the last 2 emitted values
const example = source.pipe(takeLast(2));
// Hello, World!
example.subscribe(val => console.log(val));
