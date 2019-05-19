import H from 'highland';
import hrxaudit from './internal/audit';

const audit = hrxaudit(H);
// eslint-disable-next-line import/prefer-default-export
export { audit };
