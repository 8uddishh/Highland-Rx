export default predicate => stream => (predicate
  ? stream.find(predicate) : stream.find(() => true));

// default support not there
