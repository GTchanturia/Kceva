// Aggregator for calculators split by category
// Each module exports an array of calculator metadata objects for that category

import finance from './finance.js';
import health from './health.js';
import math from './math.js';
import conversion from './conversion.js';
import datetime from './datetime.js';
import education from './education.js';
import tech from './tech.js';
import design from './design.js';
import lifestyle from './lifestyle.js';
import fun from './fun.js';
import extra from './extra.js';

/**
 * Unified calculators array combined from category modules
 */
export const CALCULATORS = [
  ...finance,
  ...health,
  ...math,
  ...conversion,
  ...datetime,
  ...education,
  ...tech,
  ...design,
  ...lifestyle,
  ...fun,
  ...extra
];

/**
 * Get calculators by category id
 */
export function getCalculatorsByCategory(categoryId) {
  return CALCULATORS.filter((calc) => calc.category === categoryId);
}

/**
 * Featured calculators for homepage
 */
export function getFeaturedCalculators() {
  return CALCULATORS.filter((calc) => calc.featured);
}

/**
 * Search calculators by name/description/keywords
 */
export function searchCalculators(query) {
  if (!query) return [];
  const searchTerm = query.toLowerCase();
  return CALCULATORS.filter((calc) =>
    calc.name.toLowerCase().includes(searchTerm) ||
    calc.description.toLowerCase().includes(searchTerm) ||
    (calc.keywords || []).some((k) => k.toLowerCase().includes(searchTerm))
  );
}

/**
 * Get calculator by id
 */
export function getCalculatorById(id) {
  return CALCULATORS.find((calc) => calc.id === id) || null;
}


