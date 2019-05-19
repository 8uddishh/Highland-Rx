export default H => (condition, dflt) => (stream) => {
  let currentMatch = null;
  let index = 0;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      next();
    } else if (x === H.nil) {
      if (!currentMatch && dflt) {
        push(null, dflt);
      } else {
        push(err, currentMatch);
      }
    } else {
      let fnVal; let fnErr;
      try {
        fnVal = condition ? condition(x, index) : true;
      } catch (e) {
        fnErr = e;
      }

      if (fnErr) {
        push(fnErr);
      } else if (fnVal) {
        currentMatch = x;
      }
      next();
    }
    // eslint-disable-next-line no-plusplus
    index++;
  });
};
