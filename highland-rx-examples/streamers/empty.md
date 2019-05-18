# empty

Stream that immediately completes.

# Examples
## Example 1: empty immediately completes
```javascript
import { empty } from 'highland-rx';

//output: 'Complete!'
empty().subscribe(() => console.log('Next'), null, () => console.log('Complete!'));
```
