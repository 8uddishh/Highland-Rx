export default H => observablePredicate => stream => stream.consume((err, x, push, next) => {
  if (err) {
    push(err);
    next();
  } else if (x === H.nil) {
    push(null, x);
  } else {
    observablePredicate().subscribe(() => {
      push(null, x);
      next();
    }, (error) => {
      push(error);
    });
  }
});
