# take
### signature: take(count: number): Observable
> Emits only the first count values emitted by the source Observable.

# Why use take?
When you are interested in only the first emission, you want to use take. Maybe you want to see what the user first clicked on when they entered the page, or you would want to subscribe to the click event and just take the first emission. Another use-case is when you need to take a snapshot of data at a particular point in time but do not require further emissions. For example, a stream of user token updates, or a route guard based on a stream in an Angular application.

# Examples
## Example 1: Take 1 value from source
```javascript
import { of, interval } from 'highland-rx';
import { take, map } from 'highland-rx/operators';

// emit 1,2,3,4,5
const source = of(1, 2, 3, 4, 5);
// take the first emitted value then complete
const example = source.pipe(take(1));
// output: 1
example.subscribe(val => console.log(val));
```

## Example 2: Take the first 5 values from source
```javascript
import { of, interval } from 'highland-rx';
import { take, map } from 'highland-rx/operators';

// emit value every 1s
const interval$ = interval(1000);
// take the first 5 emitted values
const example = interval$.pipe(
  take(5),
  map(x => x * 2),
);
// output: 0,2,4,6,8
example.subscribe(val => console.log(val));
```