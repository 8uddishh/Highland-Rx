export default stream => Object.assign(stream, {
  // subscribe: stream.each,
  subscribe: (next, error, finish) => stream.each(next)
    .done(() => {
      if (finish) {
        finish();
      }
    }),
});
