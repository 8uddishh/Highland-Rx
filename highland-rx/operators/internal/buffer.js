import { observe } from '../observe-hrx';

export default H => emitterObservable => (stream) => {
  let buffer = [];
  let lowerObsEmitted = false;
  let currentObservable = null;
  emitterObservable.subscribe();
  return stream.consume((err, x, push, next) => {
    if (err) {
      push(err);
      // next();
    } else if (x === H.nil) {
      push('Cannot use buffer inside a cold Observable');
      push(null, H.nil);
    } else {
      if (currentObservable && lowerObsEmitted) {
        currentObservable.destroy();
        currentObservable = null;
        lowerObsEmitted = false;
        push(null, buffer);
        buffer = [];
      } else if (!currentObservable) {
        currentObservable = emitterObservable.pipe(observe()).subscribe(() => {
          lowerObsEmitted = true;
        });
      }
      next();
      buffer.push(x);
    }
  });
};
