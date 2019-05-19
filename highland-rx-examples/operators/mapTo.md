# mapTo
### signature: mapTo(value: any): Observable
> Emits the given constant value on the output Observable every time the source Observable emits a value.

# Examples
## Example 1: Map every emission to string
```javascript
import { interval } from 'highland-rx';
import { mapTo } from 'highland-rx/operators';

// emit value every two seconds
const source = interval(2000);
// map all emissions to one value
const example = source.pipe(mapTo('HELLO WORLD!'));
// output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
example.subscribe(val => console.log(val));
```

