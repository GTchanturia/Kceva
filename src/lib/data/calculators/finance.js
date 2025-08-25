// Finance calculators metadata
// For now we source items from the master list for safety.
// TODO: Inline finance calculators here and delete dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const finance = ALL.filter((c) => c.category === 'finance');
export default finance;


