// Lifestyle calculators metadata
// TODO: Inline lifestyle calculators here and remove dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const lifestyle = ALL.filter((c) => c.category === 'lifestyle');
export default lifestyle;


