import H from 'highland';

const streamify = stream => Object.assign(stream, {
  subscribe(next, error, complete) {
    const s = stream.consume((e, x, p, n) => {
      if (e) {
        this.emit('error', e);
        if (error) {
          error(e);
        }
      } else if (x === H.nil) {
        p(null, H.nil);
        if (complete) {
          complete();
        }
      } else {
        if (next) {
          next(x);
        }
        n();
      }
    });
    s.resume();
    return s;
  },
  pipe: (first, ...rest) => {
    const stream$ = streamify(first(stream));
    if (!rest || rest.length === 0) {
      return stream$;
    }
    return stream$.pipe(...rest);
  },
});

export default streamify;
