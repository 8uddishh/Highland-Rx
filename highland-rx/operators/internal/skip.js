export default H => count => (stream) => {
  let skipCount = 0;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      push(null, H.nil);
    } else if (x === H.nil) {
      push(null, H.nil);
    } else if (skipCount < count) {
      // eslint-disable-next-line no-plusplus
      skipCount++;
      next();
    } else {
      push(null, x);
      next();
    }
  });
};
