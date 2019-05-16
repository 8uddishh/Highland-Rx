import streamify from './streamify';

export default H => array => ((typeof array !== 'string') ? streamify(H(array)) : streamify(H(array.split(''))));
