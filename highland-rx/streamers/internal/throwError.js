import streamify from './streamify';

export default H => error => streamify(H((push) => {
  push(error || 'Unknown error Hrx');
  push(null, H.nil);
}));
