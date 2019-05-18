# takeWhile
### signature: takeWhile(predicate: function(value, index): boolean, inclusive?: boolean): Observable
Emit values until provided expression is false.

# Examples
## Example 1: Take values under limit
```javascript
import { of } from 'highland-rx';
import { takeWhile } from 'highland-rx/operators';

// emit 1,2,3,4,5
const source$ = of(1, 2, 3, 4, 5);

// allow values until value from source is greater than 4, then complete
source$
  .pipe(takeWhile(val => val <= 4))
  // log: 1,2,3,4
  .subscribe(val => console.log(val));
```

## Example 2: takeWhile with inclusive flag
```javascript
import { of } from 'highland-rx';
import { takeWhile } from 'highland-rx/operators';

const source$ = of(1, 2, 3, 9);

source$
  // with inclusive flag, the value causing the predicate to return false will also be emitted
  .pipe(takeWhile(val => val <= 3, true))
  // log: 1, 2, 3, 9
  .subscribe(console.log);
```

## Example 3: Difference between takeWhile and filter
```javascript
import { of } from 'highland-rx';
import { takeWhile, observe, filter } from 'highland-rx/operators';

// emit 3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3
const source$ = of(3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);

source$
  .pipe(
    observe(),
    filter(it => it === 3),
  )
  // log: 3, 3, 3, 3, 3, 3, 3
  .subscribe(val => console.log('filter', val));

// allow values until value from source equals 3, then complete
source$
  .pipe(
    observe(),
    takeWhile(it => it === 3),
  )
  // log: 3, 3, 3
  .subscribe(val => console.log('takeWhile', val));

source$.subscribe();
```
> In Highland once a stream is created it can be iterated only once, in Rxjs the same observable can be subscribed by multiple consumers. Highland is stream and Rxjs is observable. To observe the same source one would need to use the observe operator. Avoid developing with shared streams unless necessary. KISS keep it simple stupid, Highland would work wonders then.