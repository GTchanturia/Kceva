// Fun calculators metadata
// TODO: Inline fun calculators here and remove dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const fun = ALL.filter((c) => c.category === 'fun');
export default fun;


