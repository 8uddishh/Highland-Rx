// eslint-disable-next-line no-unused-vars
export default H => (bufferSize, startBufferEvery) => (stream) => {
  if (startBufferEvery == null) {
    return stream.batch(bufferSize);
  }
  let buffer = [];
  let first = true;
  return stream.consume((err, x, push, next) => {
    // eslint-disable-next-line no-plusplus
    if (err) {
      push(err);
      // next();
    } else if (x === H.nil) {
      push(null, H.nil);
    } else {
      buffer.push(x);
      if (startBufferEvery < bufferSize) {
        if (buffer.length === bufferSize) {
          push(null, buffer);
          buffer = buffer.filter((_, idx) => idx >= startBufferEvery);
        }
      } else if (first) {
        if (buffer.length === bufferSize) {
          push(null, buffer);
          first = false;
        }
      } else {
        const altBuffer = buffer.filter((_, idx) => idx >= startBufferEvery);
        if (altBuffer.length === bufferSize) {
          push(null, altBuffer);
          buffer = buffer.filter((_, idx) => idx >= startBufferEvery);
        }
      }
      next();
    }
  });
};
