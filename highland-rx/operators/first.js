import H from 'highland';

export default (condition, dflt) => (stream) => {
  if (!condition) {
    return stream.find(() => true);
  }
  let found = false;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      next();
    } else if (x === H.nil) {
      if (!found && dflt) {
        push(null, dflt);
      } else {
        push(err, x);
      }
    } else {
      let fnVal; let fnErr;
      try {
        fnVal = condition(x);
      } catch (e) {
        fnErr = e;
      }

      if (fnErr) {
        push(fnErr);
      } else if (fnVal) {
        found = true;
        push(null, x);
      }
      next();
    }
  });
};
