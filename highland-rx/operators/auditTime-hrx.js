import H from 'highland';
import hrxauditTime from './internal/auditTime';

const auditTime = hrxauditTime(H);
// eslint-disable-next-line import/prefer-default-export
export { auditTime };
