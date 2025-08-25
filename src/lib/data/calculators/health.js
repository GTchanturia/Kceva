// Health calculators metadata
// TODO: Inline health calculators here and remove dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const health = ALL.filter((c) => c.category === 'health');
export default health;


