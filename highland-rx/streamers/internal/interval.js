import streamify from './streamify';

export default H => ticks => streamify(H((push) => {
  let tick = 0;
  setInterval(() => {
    push(null, tick);
    // eslint-disable-next-line no-plusplus
    tick++;
  }, ticks);
}));
