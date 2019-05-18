import H from 'highland';
import hrxobserve from './internal/observe';

const observe = hrxobserve(H);
// eslint-disable-next-line import/prefer-default-export
export { observe };
