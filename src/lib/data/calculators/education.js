// Education calculators metadata
// TODO: Inline education calculators here and remove dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const education = ALL.filter((c) => c.category === 'education');
export default education;


