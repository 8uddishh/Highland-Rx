import streamify from './streamify';

export default H => (start, end) => streamify(H((push) => {
  // eslint-disable-next-line no-plusplus
  for (let i = start; i <= end; i++) {
    push(null, i);
  }
  push(null, H.nil);
}));
