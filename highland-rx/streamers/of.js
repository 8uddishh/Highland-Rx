import streamify from './streamify';

export default H => (...obj) => streamify(H(obj));
