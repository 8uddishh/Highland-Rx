# delayWhen
### signature: delayWhen(selector: Function, sequence: Observable): Observable
> Delays the emission of items from the source Observable by a given time span determined by the emissions of another Observable.

# Examples
## Example 1: Delay based on observable
```javascript
import { interval, timer } from 'highland-rx';
import { delayWhen } from 'highland-rx/operators';

// emit value every second
const message = interval(1000);
// emit value after five seconds
const delayForFiveSeconds = () => timer(5000);
// after 5 seconds, start emitting delayed interval values
const delayWhenExample = message.pipe(delayWhen(delayForFiveSeconds));
// log values, delayed for 5 seconds
// ex. output: 5s....1...2...3
delayWhenExample.subscribe(val => console.log(val));
```
