import { of } from '../../highland-rx';
import { mapTo, delay } from '../../highland-rx/operators';

const example = of(null);
example.pipe(
  mapTo('Goodbye'),
  delay(2000),
).subscribe(console.log);
