import { from } from '../../dist';
import { pluck } from '../../dist/operators';

// import { from } from '../../highland-rx';
// import { pluck } from '../../highland-rx/operators';

const source = from([{ name: 'Joe', age: 30 }, { name: 'Sarah', age: 35 }]);
// grab names
const example = source.pipe(pluck('name'));
// output: "Joe", "Sarah"
example.subscribe(val => console.log(val));

const source2 = from([
  { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  // will return undefined when no job is found
  { name: 'Sarah', age: 35 },
]);
// grab title property under job
const example2 = source2.pipe(pluck('job', 'title'));
// output: "Developer" , undefined
example2.subscribe(val => console.log(val));
