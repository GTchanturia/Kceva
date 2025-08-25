// Unit conversion calculators metadata
// TODO: Inline conversion calculators here and remove dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const conversion = ALL.filter((c) => c.category === 'conversion');
export default conversion;


