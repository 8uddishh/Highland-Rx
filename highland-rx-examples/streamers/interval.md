# interval
### signature: interval(period: number, scheduler: Scheduler): Observable
Emit numbers in sequence based on provided timeframe.

# Examples
## Example 1: Emit sequence of values at 1 second interval
```javascript
import { interval } from 'highland-rx';

// emit value in sequence every 1 second
const source = interval(1000);
// output: 0,1,2,3,4,5....
source.subscribe(val => console.log(val));
```