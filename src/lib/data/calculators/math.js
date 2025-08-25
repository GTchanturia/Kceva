// Math & Geometry calculators metadata
// TODO: Inline math calculators here and remove dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const math = ALL.filter((c) => c.category === 'math');
export default math;


