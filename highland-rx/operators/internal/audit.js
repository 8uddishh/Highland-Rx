export default H => durationSelector => (stream) => {
  let currentValue = null;
  let lowerObsEmitted = false;
  let currentObservable = null;
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      // next();
    } else if (x === H.nil) {
      push('Cannot use audit inside a cold Observable');
      push(null, H.nil);
    } else {
      currentValue = x;
      if (currentObservable && lowerObsEmitted) {
        currentObservable.destroy();
        currentObservable = null;
        lowerObsEmitted = false;
        push(null, currentValue);
      } else if (!currentObservable) {
        currentObservable = durationSelector().subscribe(() => {
          lowerObsEmitted = true;
        });
      }
      next();
    }
  });
};
