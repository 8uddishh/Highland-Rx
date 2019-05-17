import H from 'highland';
import hrxdistinctUntilChanged from './internal/distinctUntilChanged';

const distinctUntilChanged = hrxdistinctUntilChanged(H);
// eslint-disable-next-line import/prefer-default-export
export { distinctUntilChanged };
