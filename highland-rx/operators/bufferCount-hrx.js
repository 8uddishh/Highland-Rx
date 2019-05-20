import H from 'highland';
import hrxbufferCount from './internal/bufferCount';

const bufferCount = hrxbufferCount(H);
// eslint-disable-next-line import/prefer-default-export
export { bufferCount };
