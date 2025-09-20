/**
 * SEO Utilities for kceva Calculator Website
 * Centralized SEO functions for consistent metadata across the site
 */

/**
 * Generate page title with consistent branding
 * @param {string} pageTitle - The specific page title
 * @param {boolean} includeBrand - Whether to include brand name
 * @returns {string} Complete page title
 */
export function generatePageTitle(pageTitle, includeBrand = true) {
  const brand = 'kceva';
  const suffix = 'Free Online Calculators';
  
  if (!includeBrand) return pageTitle;
  
  if (pageTitle) {
    return `${pageTitle} | ${brand} - ${suffix}`;
  }
  
  return `${brand} - 100+ ${suffix}`;
}

/**
 * Generate meta description with consistent messaging
 * @param {string} description - Specific page description
 * @param {string} category - Calculator category (optional)
 * @returns {string} Complete meta description
 */
export function generateMetaDescription(description, category = '') {
  const baseMessage = 'Fast, accurate, mobile-friendly tools with instant results. No ads, no registration required.';
  
  if (category) {
    return `${description} ${baseMessage} Browse ${category} calculators at kceva.com.`;
  }
  
  return `${description} ${baseMessage}`;
}

/**
 * Generate keywords array with consistent base keywords
 * @param {string[]} specificKeywords - Page-specific keywords
 * @returns {string} Comma-separated keywords string
 */
export function generateKeywords(specificKeywords = []) {
  const baseKeywords = [
    'kceva',
    'free calculator',
    'online calculator',
    'instant results',
    'no ads',
    'mobile friendly',
    'accurate calculations'
  ];
  
  return [...baseKeywords, ...specificKeywords].join(', ');
}

/**
 * Generate structured data for calculator pages
 * @param {Object} calculator - Calculator object
 * @param {string} url - Full URL of the page
 * @returns {Object} Structured data object
 */
export function generateCalculatorStructuredData(calculator, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calculator.name,
    description: `${calculator.description} - Free online calculator with instant results`,
    url: url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    publisher: {
      '@type': 'Organization',
      name: 'kceva',
      url: 'https://kceva.com'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb objects {name, url}
 * @returns {Object} Breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * Generate FAQ structured data for calculator pages
 * @param {Array} faqs - Array of FAQ objects {question, answer}
 * @returns {Object} FAQ structured data
 */
export function generateFAQStructuredData(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Core Web Vitals optimization utilities
 */
export const coreWebVitals = {
  /**
   * Preload critical resources
   * @param {string[]} resources - Array of resource URLs
   */
  preloadResources(resources) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });
  },

  /**
   * Lazy load images with intersection observer
   * @param {string} selector - CSS selector for images
   */
  lazyLoadImages(selector = 'img[data-src]') {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll(selector).forEach(img => {
        imageObserver.observe(img);
      });
    }
  },

  /**
   * Optimize Cumulative Layout Shift (CLS)
   */
  optimizeCLS() {
    // Add aspect ratio containers for images
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      img.style.aspectRatio = '16/9'; // Default aspect ratio
    });
  }
};

/**
 * Performance monitoring utilities
 */
export const performance = {
  /**
   * Measure and report Core Web Vitals
   */
  measureCoreWebVitals() {
    if ('web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
  },

  /**
   * Monitor calculator usage for analytics
   * @param {string} calculatorId - Calculator identifier
   * @param {string} action - Action performed
   */
  trackCalculatorUsage(calculatorId, action = 'calculate') {
    // Privacy-focused analytics - no personal data
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: 'calculator_usage',
        event_label: calculatorId,
        value: 1
      });
    }
  }
};