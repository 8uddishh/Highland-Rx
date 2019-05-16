export default H => (...starter) => stream => H([H(starter), stream]).merge();
