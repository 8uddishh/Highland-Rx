import streamify from './streamify';

export default H => array => streamify(H(array));
