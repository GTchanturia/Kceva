// Technical/IT calculators metadata
// TODO: Inline tech calculators here and remove dependency on ../calculators.js
import { CALCULATORS as ALL } from '../calculators.js';

const tech = ALL.filter((c) => c.category === 'tech');
export default tech;


