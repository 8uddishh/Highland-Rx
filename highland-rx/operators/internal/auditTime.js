import { audit } from '../audit-hrx';
import { interval } from '../../streamers/interval-hrx';

// eslint-disable-next-line no-unused-vars
export default H => duration => stream => stream.pipe(audit(() => interval(duration)));
