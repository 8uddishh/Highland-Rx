import H from 'highland';

import hrxmap from './map';
import hrxmapTo from './mapTo';
import hrxfilter from './filter';
import hrxtap from './tap';
import hrxpluck from './pluck';
import hrxfirst from './first';
import hrxstartWith from './startWith';
import hrxevery from './every';

const hrx = {
  map: hrxmap(H),
  mapTo: hrxmapTo(H),
  filter: hrxfilter(H),
  tap: hrxtap(H),
  pluck: hrxpluck(H),
  first: hrxfirst(H),
  startWith: hrxstartWith(H),
  every: hrxevery(H),
};

const {
  map,
  mapTo,
  filter,
  tap,
  pluck,
  first,
  startWith,
  every,
} = hrx;

export {
  map,
  mapTo,
  filter,
  tap,
  tap as do,
  pluck,
  first,
  startWith,
  every,
};
