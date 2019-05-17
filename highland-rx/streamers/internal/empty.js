import streamify from './streamify';

export default H => () => streamify(H([]));
