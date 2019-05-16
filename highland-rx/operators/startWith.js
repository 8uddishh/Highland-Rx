import H from 'highland';

export default (...starter) => stream => H([H(starter), stream]).merge();
