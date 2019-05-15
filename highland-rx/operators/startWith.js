import H from 'highland';

export default starter => (stream) => {
  let firstConsume = false;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      next();
    } else if (x === H.nil) {
      push(null, H.nil);
    } else {
      if (!firstConsume) {
        push(null, starter);
        firstConsume = true;
      }
      push(null, x);
      next();
    }
  });
};
