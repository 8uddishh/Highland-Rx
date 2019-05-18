export default H => notifier => (stream) => {
  let subsciberEmitted = false;
  notifier.subscribe(() => {
    subsciberEmitted = true;
  });
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      push(null, H.nil);
    } else if (x === H.nil) {
      push('Cannot use takeUntil inside a cold Observable');
      push(null, H.nil);
    } else if (subsciberEmitted) {
      push(null, H.nil);
    } else {
      push(null, x);
      next();
    }
  });
};
