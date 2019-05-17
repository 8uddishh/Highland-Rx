export default H => dflt => (stream) => {
  let ifAnyPush = false;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      next();
    } else if (x === H.nil) {
      if (!ifAnyPush) {
        push(null, dflt);
      }
      push(null, x);
    } else {
      ifAnyPush = true;
      push(null, x);
      next();
    }
  });
};
