import streamify from './streamify';

export default H => (initial, ticks) => streamify(H((push) => {
  let tick = 0;
  setTimeout(() => {
    push(null, tick);
    // eslint-disable-next-line no-plusplus
    tick++;
    if (ticks) {
      setInterval(() => {
        push(null, tick);
        // eslint-disable-next-line no-plusplus
        tick++;
      }, ticks);
    } else {
      push(null, H.nil);
    }
  }, initial);
}));
