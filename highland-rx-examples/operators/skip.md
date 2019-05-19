# skip
### signature: skip(the: Number): Observable
Skip the provided number of emitted values.

# Why use skip?
Skip allows you to ignore the first x emissions from the source. Generally skip is used when you have an observable that always emits certain values on subscription that you wish to ignore. Perhaps those first few aren't needed or you are subscribing to a Replay or BehaviorSubject and do not need to act on the initial values. Reach for skip if you are only concerned about later emissions.

You could mimic skip by using filter with indexes. Ex. .filter((val, index) => index > 1)

# Examples
## Example 1: Skipping values before emission
```javascript
import { interval } from '../../highland-rx';
import { skip } from '../../highland-rx/operators';

// emit every 1s
const source = interval(1000);
// skip the first 5 emitted values
const example = source.pipe(skip(5));
// output: 5...6...7...8........
example.subscribe(val => console.log(val));
```

## Example 2: Short hand for a specific filter use case
```javascript
import { from } from 'highland-rx';
import { skip, filter } from 'highland-rx/operators';

const numArrayObs = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 3,4,5...
numArrayObs.pipe(observe(), skip(2)).subscribe(console.log);

// 3,4,5...
numArrayObs
  .pipe(observe(), filter((val, index) => index > 1))
  .subscribe(console.log);

numArrayObs.subscribe();
```
