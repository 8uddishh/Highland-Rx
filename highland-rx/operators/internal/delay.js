export default H => time => stream => stream.consume((err, x, push, next) => {
  if (err) {
    push(err);
    next();
  } else if (x === H.nil) {
    push(null, x);
  } else {
    setTimeout(() => {
      push(null, x);
      next();
    }, time);
  }
});
