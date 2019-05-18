export default H => (condition, inclusive) => (stream) => {
  let found = false;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      next();
    } else if (x === H.nil) {
      push(null, x);
    } else if (condition(x)) {
      found = true;
      push(null, x);
      next();
    } else if (found) {
      if (inclusive) {
        push(null, x);
      }
      push(err, H.nil);
    } else {
      next();
    }
  });
};
