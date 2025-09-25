/**
 * Validation Utilities
 * Comprehensive input validation for calculator components
 */

/**
 * Validation rule types
 * @typedef {Object} ValidationRule
 * @property {string} type - Type of validation
 * @property {*} value - Value to validate against
 * @property {string} message - Error message
 */

/**
 * Validation result
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {string[]} errors - Array of error messages
 */

/**
 * Common validation rules
 */
export const validationRules = {
  required: (message = 'This field is required') => ({
    type: 'required',
    message,
    validate: (value) => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'number') return !isNaN(value) && isFinite(value);
      return value != null && value !== '';
    }
  }),

  min: (minValue, message) => ({
    type: 'min',
    value: minValue,
    message: message || `Value must be at least ${minValue}`,
    validate: (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && num >= minValue;
    }
  }),

  max: (maxValue, message) => ({
    type: 'max',
    value: maxValue,
    message: message || `Value must be at most ${maxValue}`,
    validate: (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && num <= maxValue;
    }
  }),

  range: (minValue, maxValue, message) => ({
    type: 'range',
    value: { min: minValue, max: maxValue },
    message: message || `Value must be between ${minValue} and ${maxValue}`,
    validate: (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && num >= minValue && num <= maxValue;
    }
  }),

  integer: (message = 'Value must be a whole number') => ({
    type: 'integer',
    message,
    validate: (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && Number.isInteger(num);
    }
  }),

  positive: (message = 'Value must be positive') => ({
    type: 'positive',
    message,
    validate: (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    }
  }),

  nonNegative: (message = 'Value must be non-negative') => ({
    type: 'nonNegative',
    message,
    validate: (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && num >= 0;
    }
  }),

  email: (message = 'Please enter a valid email address') => ({
    type: 'email',
    message,
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
  }),

  url: (message = 'Please enter a valid URL') => ({
    type: 'url',
    message,
    validate: (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }
  }),

  date: (message = 'Please enter a valid date') => ({
    type: 'date',
    message,
    validate: (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }
  }),

  pattern: (regex, message = 'Invalid format') => ({
    type: 'pattern',
    value: regex,
    message,
    validate: (value) => regex.test(value)
  }),

  custom: (validateFn, message = 'Invalid value') => ({
    type: 'custom',
    message,
    validate: validateFn
  })
};

/**
 * Validate a single value against rules
 * @param {*} value - Value to validate
 * @param {ValidationRule[]} rules - Array of validation rules
 * @returns {ValidationResult} Validation result
 */
export function validateValue(value, rules = []) {
  const errors = [];

  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate an object against a schema
 * @param {Object} data - Data to validate
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation results for each field
 */
export function validateSchema(data, schema) {
  const results = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(schema)) {
    const fieldResult = validateValue(data[field], rules);
    results[field] = fieldResult;
    
    if (!fieldResult.isValid) {
      isValid = false;
    }
  }

  return {
    isValid,
    fields: results,
    errors: Object.entries(results)
      .filter(([, result]) => !result.isValid)
      .reduce((acc, [field, result]) => {
        acc[field] = result.errors;
        return acc;
      }, {})
  };
}

/**
 * Calculator-specific validation schemas
 */
export const calculatorValidation = {
  // BMI Calculator
  bmi: {
    weight: [
      validationRules.required('Weight is required'),
      validationRules.positive('Weight must be positive'),
      validationRules.range(1, 1000, 'Weight must be between 1 and 1000 kg')
    ],
    height: [
      validationRules.required('Height is required'),
      validationRules.positive('Height must be positive'),
      validationRules.range(50, 300, 'Height must be between 50 and 300 cm')
    ]
  },

  // Loan Calculator
  loan: {
    principal: [
      validationRules.required('Loan amount is required'),
      validationRules.positive('Loan amount must be positive'),
      validationRules.min(100, 'Minimum loan amount is $100')
    ],
    rate: [
      validationRules.required('Interest rate is required'),
      validationRules.nonNegative('Interest rate cannot be negative'),
      validationRules.max(50, 'Interest rate seems too high (max 50%)')
    ],
    term: [
      validationRules.required('Loan term is required'),
      validationRules.positive('Loan term must be positive'),
      validationRules.range(1, 50, 'Loan term must be between 1 and 50 years')
    ]
  },

  // Age Calculator
  age: {
    birthDate: [
      validationRules.required('Birth date is required'),
      validationRules.date('Please enter a valid date'),
      validationRules.custom(
        (value) => new Date(value) <= new Date(),
        'Birth date cannot be in the future'
      )
    ]
  },

  // Currency Converter
  currency: {
    amount: [
      validationRules.required('Amount is required'),
      validationRules.positive('Amount must be positive'),
      validationRules.max(1e12, 'Amount is too large')
    ],
    fromCurrency: [
      validationRules.required('Source currency is required')
    ],
    toCurrency: [
      validationRules.required('Target currency is required')
    ]
  },

  // Temperature Converter
  temperature: {
    value: [
      validationRules.required('Temperature value is required'),
      validationRules.custom(
        (value) => {
          const num = parseFloat(value);
          return !isNaN(num) && num >= -273.15; // Absolute zero in Celsius
        },
        'Temperature cannot be below absolute zero (-273.15°C)'
      )
    ],
    fromUnit: [
      validationRules.required('Source unit is required')
    ],
    toUnit: [
      validationRules.required('Target unit is required')
    ]
  }
};

/**
 * Real-time validation hook for Svelte components
 * @param {Object} initialData - Initial form data
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation state and methods
 */
export function useValidation(initialData = {}, schema = {}) {
  let data = { ...initialData };
  let errors = {};
  let touched = {};
  let isValid = true;

  // Validate specific field
  function validateField(field, value) {
    if (!schema[field]) return { isValid: true, errors: [] };
    
    const result = validateValue(value, schema[field]);
    errors[field] = result.errors;
    touched[field] = true;
    
    // Update overall validity
    isValid = Object.values(errors).every(fieldErrors => fieldErrors.length === 0);
    
    return result;
  }

  // Validate all fields
  function validateAll() {
    const result = validateSchema(data, schema);
    errors = result.errors;
    touched = Object.keys(schema).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    isValid = result.isValid;
    
    return result;
  }

  // Update field value and validate
  function updateField(field, value) {
    data[field] = value;
    return validateField(field, value);
  }

  // Clear validation errors
  function clearErrors() {
    errors = {};
    touched = {};
    isValid = true;
  }

  // Get error for specific field
  function getFieldError(field) {
    return touched[field] && errors[field] ? errors[field][0] : '';
  }

  // Check if field has error
  function hasFieldError(field) {
    return touched[field] && errors[field] && errors[field].length > 0;
  }

  return {
    data,
    errors,
    touched,
    isValid,
    validateField,
    validateAll,
    updateField,
    clearErrors,
    getFieldError,
    hasFieldError
  };
}

/**
 * Sanitization utilities
 */
export const sanitize = {
  // Sanitize number input
  number: (value, options = {}) => {
    const { min, max, decimals = 10 } = options;
    let num = parseFloat(value);
    
    if (isNaN(num)) return null;
    
    // Apply min/max constraints
    if (typeof min === 'number') num = Math.max(min, num);
    if (typeof max === 'number') num = Math.min(max, num);
    
    // Round to specified decimal places
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  // Sanitize string input
  string: (value, options = {}) => {
    const { maxLength, trim = true, toLowerCase = false, toUpperCase = false } = options;
    let str = String(value);
    
    if (trim) str = str.trim();
    if (toLowerCase) str = str.toLowerCase();
    if (toUpperCase) str = str.toUpperCase();
    if (maxLength) str = str.slice(0, maxLength);
    
    return str;
  },

  // Sanitize HTML to prevent XSS
  html: (value) => {
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
  }
};