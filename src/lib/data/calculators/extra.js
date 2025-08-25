// Extra calculators metadata (misc tools)
// TODO: Inline extra calculators here and remove dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const extra = ALL.filter((c) => c.category === 'Extra');
export default extra;


