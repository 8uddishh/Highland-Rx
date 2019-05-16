import streamify from './streamify';

export default H => (aggregator) => {
  const observer = (pu, ne) => ({
    next: (x) => {
      pu(null, x);
      ne();
    },
    error: (err) => {
      pu(err);
      ne();
    },
    complete: () => {
      pu(null, H.nil);
    },
  });
  let obs = null;
  return streamify(H((push, next) => {
    if (!obs) {
      obs = observer(push, next);
      aggregator(obs);
    }
  }));
};
