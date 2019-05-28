import { interval } from '../../streamers/interval-hrx';
import { observe } from '../observe-hrx';

// eslint-disable-next-line no-unused-vars
export default H => (bufferTimeSpan, bufferCreationInterval) => (stream) => {
  const bufferInterval$ = interval(bufferTimeSpan);
  let streamComplete = false;
  let buffer = [];
  let firstTime = true;
  let bufferObserver = null;
  let bufferCreationIntervalObserver = null;
  let bufferCreationInterval$ = null;
  let currPosition = [0];
  let shouldPush = false;
  bufferInterval$.subscribe();
  if (bufferCreationInterval != null) {
    bufferCreationInterval$ = interval(bufferCreationInterval);
    bufferCreationInterval$.subscribe(() => {
      currPosition.push(buffer.length);
    });
  }
  return stream.consume((err, x, push, next) => {
    if (!bufferObserver) {
      if (bufferCreationInterval == null) {
        bufferObserver = bufferInterval$.pipe(
          observe(),
        ).subscribe(() => {
          push(null, buffer);
          buffer = [];
          if (streamComplete) {
            push(null, H.nil);
            setTimeout(() => {
              bufferObserver.destroy();
              bufferObserver = null;
            });
          }
        });
      } else {
        bufferObserver = bufferInterval$.pipe(
          observe(),
        ).subscribe(() => {
          if (firstTime) {
            const [first, ...rest] = currPosition;
            currPosition = rest;
            push(null, buffer.slice(first, buffer.length));
            firstTime = false;
          }
          setTimeout(() => {
            bufferObserver.destroy();
            bufferObserver = null;
          });
        });

        if (!firstTime && !bufferCreationIntervalObserver) {
          bufferCreationIntervalObserver = bufferCreationInterval$.pipe(
            observe(),
          ).subscribe(() => {
            if (streamComplete) {
              push(null, H.nil);
              setTimeout(() => {
                bufferCreationIntervalObserver.destroy();
                bufferCreationIntervalObserver = null;
              });
            }
            if (!firstTime) {
              shouldPush = true;
            }
          });
        }
      }
    }
    if (err) {
      push(err);
    } else if (x === H.nil) {
      streamComplete = true;
    } else {
      buffer.push(x);
      if (shouldPush) {
        const [first, ...rest] = currPosition;
        currPosition = rest;
        push(null, buffer.slice(first, currPosition[currPosition.length]));
        shouldPush = false;
      }
      next();
    }
  });
};
