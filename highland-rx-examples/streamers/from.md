# from

### signature: from(ish: ObservableInput, mapFn: function, thisArg: any, scheduler: Scheduler): Observable

# Turn an array, promise, or iterable into an observable.

* This operator can be used to convert a promise to an observable!
* For arrays and iterables, all contained values will be emitted as a sequence!
*  This operator can also be used to emit a string as a sequence of characters!

# Examples

## Example 1: Observable from array
```javascript
import { from } from 'highland-rx';

// emit array as a sequence of values
const arraySource = from([1, 2, 3, 4, 5]);
// output: 1,2,3,4,5
arraySource.subscribe(val => console.log(val));
```

## Example 2: Observable from promise
```javascript
import { from } from 'highland-rx';

// emit result of promise
const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
// output: 'Hello World'
promiseSource.subscribe(val => console.log(val));
```

## Example 3: Observable from collection
```javascript
import { from } from 'highland-rx';

// works on js collections
const map = new Map();
map.set(1, 'Hi');
map.set(2, 'Bye');

const mapSource = from(map);
// output: [1, 'Hi'], [2, 'Bye']
mapSource.subscribe(val => console.log(val));
```

## Example 4: Observable from string
```javascript
import { from } from 'highland-rx';

// emit string as a sequence
const source = from('Hello World');
// output: 'H','e','l','l','o',' ','W','o','r','l','d'
source.subscribe(val => console.log(val));
```

