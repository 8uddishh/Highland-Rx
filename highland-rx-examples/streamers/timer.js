import { timer } from '../../dist';

// import { timer } from '../../highland-rx';

// emit 0 after 1 second then complete, since no second argument is supplied
const source = timer(1000);
// output: 0
source.subscribe(val => console.log(val));

const source1 = timer(1000, 2000);
// output: 0,1,2,3,4,5......
source1.subscribe(val => console.log(val));
