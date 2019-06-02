# takeLast
### signature: takeLast(count: number): Observable
> Emits only the last count values emitted by the source Observable.

# Examples
## Example 1: take the last 2 emitted values before completion
```javascript
import { of } from 'highland-rx';
import { takeLast } from 'highland-rx/operators';

const source = of('Ignore', 'Ignore', 'Hello', 'World!');
// take the last 2 emitted values
const example = source.pipe(takeLast(2));
// Hello, World!
example.subscribe(val => console.log(val));
```