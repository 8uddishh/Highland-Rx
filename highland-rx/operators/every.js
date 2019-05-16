export default H => condition => stream => stream.consume((err, x, push, next) => {
  if (err) {
    push(err);
    next();
  } else if (x === H.nil) {
    push(null, true);
    push(null, x);
  } else {
    let fnVal; let fnErr;
    try {
      fnVal = condition(x);
    } catch (e) {
      fnErr = e;
    }

    if (fnErr) {
      push(fnErr);
    } else if (!fnVal) {
      push(null, false);
      push(null, x);
    }
    next();
  }
});
