import H from 'highland';
import hrxthrowError from './internal/throwError';

const throwError = hrxthrowError(H);
// eslint-disable-next-line import/prefer-default-export
export { throwError };
