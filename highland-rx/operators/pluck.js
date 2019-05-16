import H from 'highland';

const pluckDeep = (first, ...props) => (obj) => {
  if (props.length === 0) {
    return obj[first];
  }
  if (obj[first]) {
    return pluckDeep(...props)(obj[first]);
  }
  return obj[first];
};

export default (...props) => stream => stream.consume((err, x, push, next) => {
  if (err) {
    push(err);
    next();
  } else if (x === H.nil) {
    push(err, x);
  } else if (H.isObject(x)) {
    push(null, pluckDeep(...props)(x));
    next();
  } else {
    push(new Error(`Expected Object, got ${(typeof x)}`));
    next();
  }
});
