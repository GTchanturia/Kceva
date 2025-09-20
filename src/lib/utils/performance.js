/**
 * Performance Optimization Utilities for kceva
 * Core Web Vitals and performance monitoring
 */

/**
 * Lazy loading utilities
 */
export const lazyLoading = {
  /**
   * Initialize intersection observer for lazy loading
   * @param {string} selector - CSS selector for elements to lazy load
   * @param {Object} options - Intersection observer options
   */
  init(selector = '[data-lazy]', options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, defaultOptions);

      document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
      });
    } else {
      // Fallback for older browsers
      document.querySelectorAll(selector).forEach(el => {
        this.loadElement(el);
      });
    }
  },

  /**
   * Load a lazy element
   * @param {HTMLElement} element - Element to load
   */
  loadElement(element) {
    if (element.dataset.src) {
      element.src = element.dataset.src;
      element.removeAttribute('data-src');
    }
    
    if (element.dataset.srcset) {
      element.srcset = element.dataset.srcset;
      element.removeAttribute('data-srcset');
    }

    element.classList.remove('lazy');
    element.classList.add('loaded');
  }
};

/**
 * Resource preloading utilities
 */
export const preloading = {
  /**
   * Preload critical calculator components
   * @param {string[]} calculatorIds - Array of calculator IDs to preload
   */
  preloadCalculators(calculatorIds) {
    calculatorIds.forEach(id => {
      import(`../calculators/${id}.svelte`).catch(() => {
        console.warn(`Failed to preload calculator: ${id}`);
      });
    });
  },

  /**
   * Preload critical CSS and fonts
   */
  preloadCriticalResources() {
    const criticalResources = [
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' },
      { href: '/favicon.svg', as: 'image' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'style') {
        link.onload = () => {
          link.rel = 'stylesheet';
        };
      }
      document.head.appendChild(link);
    });
  },

  /**
   * Prefetch next likely pages
   * @param {string[]} urls - URLs to prefetch
   */
  prefetchPages(urls) {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }
};

/**
 * Core Web Vitals optimization
 */
export const coreWebVitals = {
  /**
   * Optimize Largest Contentful Paint (LCP)
   */
  optimizeLCP() {
    // Preload hero images
    const heroImages = document.querySelectorAll('.hero img, .above-fold img');
    heroImages.forEach(img => {
      if (img.src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = img.src;
        link.as = 'image';
        document.head.appendChild(link);
      }
    });

    // Optimize font loading
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.onload = () => {
      fontLink.rel = 'stylesheet';
    };
    document.head.appendChild(fontLink);
  },

  /**
   * Optimize First Input Delay (FID)
   */
  optimizeFID() {
    // Use passive event listeners where possible
    const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove'];
    
    passiveEvents.forEach(eventType => {
      document.addEventListener(eventType, () => {}, { passive: true });
    });

    // Defer non-critical JavaScript
    const deferredScripts = document.querySelectorAll('script[data-defer]');
    deferredScripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.src = script.src;
      newScript.defer = true;
      script.parentNode.replaceChild(newScript, script);
    });
  },

  /**
   * Optimize Cumulative Layout Shift (CLS)
   */
  optimizeCLS() {
    // Add explicit dimensions to images
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      // Set default aspect ratio to prevent layout shift
      img.style.aspectRatio = '16/9';
      img.style.width = '100%';
      img.style.height = 'auto';
    });

    // Reserve space for dynamic content
    const dynamicContainers = document.querySelectorAll('[data-dynamic]');
    dynamicContainers.forEach(container => {
      if (!container.style.minHeight) {
        container.style.minHeight = '200px';
      }
    });
  }
};

/**
 * Bundle optimization utilities
 */
export const bundleOptimization = {
  /**
   * Dynamically import calculator components
   * @param {string} calculatorId - Calculator ID
   * @returns {Promise} Component import promise
   */
  async importCalculator(calculatorId) {
    try {
      const component = await import(`../calculators/${calculatorId}.svelte`);
      return component.default;
    } catch (error) {
      console.error(`Failed to load calculator: ${calculatorId}`, error);
      return null;
    }
  },

  /**
   * Preload calculator components based on user behavior
   * @param {string[]} likelyCalculators - Array of likely next calculators
   */
  preloadLikelyCalculators(likelyCalculators) {
    // Use requestIdleCallback for non-blocking preloading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        likelyCalculators.forEach(id => {
          this.importCalculator(id);
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        likelyCalculators.forEach(id => {
          this.importCalculator(id);
        });
      }, 2000);
    }
  }
};

/**
 * Performance monitoring
 */
export const monitoring = {
  /**
   * Measure calculator performance
   * @param {string} calculatorId - Calculator identifier
   * @param {Function} calculationFunction - Function to measure
   */
  measureCalculation(calculatorId, calculationFunction) {
    const startTime = performance.now();
    
    const result = calculationFunction();
    
    const endTime = performance.now();
    const duration = endTime - startTime;

    // Log performance metrics (privacy-friendly)
    console.log(`Calculator ${calculatorId} execution time: ${duration.toFixed(2)}ms`);

    // Track slow calculations
    if (duration > 100) {
      console.warn(`Slow calculation detected: ${calculatorId} took ${duration.toFixed(2)}ms`);
    }

    return result;
  },

  /**
   * Monitor Core Web Vitals
   */
  initCoreWebVitalsMonitoring() {
    // Only load web-vitals library if available
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric) => {
          console.log('CLS:', metric.value);
        });
        
        getFID((metric) => {
          console.log('FID:', metric.value);
        });
        
        getFCP((metric) => {
          console.log('FCP:', metric.value);
        });
        
        getLCP((metric) => {
          console.log('LCP:', metric.value);
        });
        
        getTTFB((metric) => {
          console.log('TTFB:', metric.value);
        });
      }).catch(() => {
        console.log('Web Vitals library not available');
      });
    }
  }
};

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations() {
  // Initialize lazy loading
  lazyLoading.init();
  
  // Optimize Core Web Vitals
  coreWebVitals.optimizeLCP();
  coreWebVitals.optimizeFID();
  coreWebVitals.optimizeCLS();
  
  // Start monitoring
  monitoring.initCoreWebVitalsMonitoring();
  
  // Preload critical resources
  preloading.preloadCriticalResources();
}