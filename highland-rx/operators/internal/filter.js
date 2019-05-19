// eslint-disable-next-line no-unused-vars
export default H => selector => (stream) => {
  let index = 0;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      next();
    } else if (x === H.nil) {
      push(err, x);
    } else {
      let fnVal; let fnErr;
      try {
        fnVal = selector(x, index);
      } catch (e) {
        fnErr = e;
      }
      if (fnErr) {
        push(fnErr);
      } else if (fnVal) {
        push(null, x);
      }
      // eslint-disable-next-line no-plusplus
      index++;
      next();
    }
  });
};
