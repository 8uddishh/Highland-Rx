import H from 'highland';
import { create } from './streamers/create-hrx';

const Observable = {
  create: create(H),
};

export { Observable };
export { empty } from './streamers/empty-hrx';
export { from } from './streamers/from-hrx';
export { interval } from './streamers/interval-hrx';
export { merge } from './streamers/merge-hrx';
export { of } from './streamers/of-hrx';
export { of as just } from './streamers/of-hrx';
export { range } from './streamers/range-hrx';
export { timer } from './streamers/timer-hrx';
