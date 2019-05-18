import streamify from './streamify';

export default H => (...streams) => streamify(H(streams).merge());
