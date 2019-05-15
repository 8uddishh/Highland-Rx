import H from 'highland';

import hrxRange from './streamers/range';
import hrxOf from './streamers/of';
import hrxFrom from './streamers/from';
import hrxInterval from './streamers/interval';
import hrxTimer from './streamers/timer';
import hrxEmpty from './streamers/empty';

const Observable = {
  ...H,
  range: hrxRange(H),
  of: hrxOf(H),
  from: hrxFrom(H),
  interval: hrxInterval(H),
  timer: hrxTimer(H),
  empty: hrxEmpty(H),
};

const {
  range,
  of,
  from,
  interval,
  timer,
  empty,
} = Observable;

// eslint-disable-next-line import/prefer-default-export
export {
  Observable,
  range,
  of,
  from,
  interval,
  timer,
  empty,
};
