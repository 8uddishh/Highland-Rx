import axios from 'axios';
import {
  range,
  of,
  from,
  interval,
  timer,
  empty,
} from './highland-rx';

console.log('range streamer');
range(1, 10).subscribe(console.log, console.log, () => {
  console.log('Complete');
});

console.log('of streamer');
of(1, 2, 3, 4, 5).subscribe(console.log);

console.log('from streamer - array');
from([1, 2, 3, 4, 5]).subscribe(console.log);
console.log('from streamer - promise');
from(axios.get('https://swapi.co/api/people/3')).subscribe(({ data }) => {
  console.log(data);
}, console.log, () => {
  console.log('finish api call');
});

console.log('interval streamer');
interval(3000).subscribe(console.log);

console.log('timer streamer');
timer(3000, 1000).subscribe(console.log);

console.log('empty streamer');
empty().subscribe(console.log, console.log, () => {
  console.log('Empty observable');
});
