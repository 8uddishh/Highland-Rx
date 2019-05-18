# range
### signature: range(start: number, count: number, scheduler: Scheduler): Observable
Emit numbers in provided range in sequence.

# Examples
## Example 1: Emit range 1-10
```javascript
import { range } from 'highland-rx';

// emit 1-10 in sequence
const source = range(1, 10);
// output: 1,2,3,4,5,6,7,8,9,10
source.subscribe(val => console.log(val));
```