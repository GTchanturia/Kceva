// Design & Graphics calculators metadata
// TODO: Inline design calculators here and remove dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const design = ALL.filter((c) => c.category === 'design');
export default design;


