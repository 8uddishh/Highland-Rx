import { of, empty } from '../../dist';
import { defaultIfEmpty } from '../../dist/operators';

// import { of, empty } from '../../highland-rx';
// import { defaultIfEmpty } from '../../highland-rx/operators';

// emit 'Observable.of() Empty!' when empty, else any values from source
const exampleOne = of().pipe(defaultIfEmpty('Observable.of() Empty!'));
// output: 'Observable.of() Empty!'
exampleOne.subscribe(val => console.log(val));

// emit 'Observable.empty()!' when empty, else any values from source
const example2 = empty().pipe(defaultIfEmpty('Observable.empty()!'));
// output: 'Observable.empty()!'
example2.subscribe(val => console.log(val));
