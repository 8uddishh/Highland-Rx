# of / just
### signature: of(...values, scheduler: Scheduler): Observable
Emit variable amount of values in a sequence and then emits a complete notification.

# Examples
## Example 1: Emitting a sequence of numbers
```javascript
import { of } from 'highland-rx';

// emits any number of provided values in sequence
const source = of(1, 2, 3, 4, 5);
// output: 1,2,3,4,5
source.subscribe(val => console.log(val));
```

## Example 2: Emitting an object, array, and function
```javascript
import { of } from 'highland-rx';

// emits values of any type
const source2 = of({ name: 'Brian' }, [1, 2, 3], function hello() {
  return 'Hello';
});
source2.subscribe(val => console.log(val));
```