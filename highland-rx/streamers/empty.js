import streamify from './streamify-noerror';

export default H => () => streamify(H([]));
