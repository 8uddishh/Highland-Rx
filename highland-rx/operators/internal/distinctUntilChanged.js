export default H => comparer => (stream) => {
  let lastValue = null; let firstTime = true;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      next();
    } else if (x === H.nil) {
      push(null, x);
    } else {
      if (!comparer && (firstTime || x !== lastValue)) {
        lastValue = x;
        firstTime = false;
        push(null, x);
      }
      if (comparer && (firstTime || !comparer(lastValue, x))) {
        lastValue = x;
        firstTime = false;
        push(null, x);
      }
      next();
    }
  });
};
