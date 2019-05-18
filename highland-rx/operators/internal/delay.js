export default H => time => stream => stream.consume((err, x, push, next) => {
  let streamComplete = false;
  if (err) {
    push(err);
    next();
  } else if (x === H.nil) {
    streamComplete = true;
    // push(null, x);
  } else {
    setTimeout(() => {
      push(null, x);
      if (streamComplete) {
        push(null, H.nil);
      }
    }, time);
    next();
  }
});
