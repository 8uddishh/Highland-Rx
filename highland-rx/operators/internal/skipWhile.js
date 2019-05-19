export default H => condition => (stream) => {
  let match = false;
  let index = 0;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      next();
    } else if (x === H.nil) {
      push(null, x);
    } else if (!condition(x, index)) {
      match = true;
      push(null, x);
      next();
    } else if (match) {
      push(null, x);
      push(err, H.nil);
    } else {
      next();
    }
    // eslint-disable-next-line no-plusplus
    index++;
  });
};
