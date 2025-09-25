/**
 * Performance Monitoring Utilities
 * Track and optimize calculator performance
 */

import { performance as performanceStore } from '$lib/stores/calculator.js';

/**
 * Performance measurement decorator
 * @param {string} calculatorId - Calculator identifier
 * @param {Function} fn - Function to measure
 * @returns {Function} Wrapped function with performance tracking
 */
export function measurePerformance(calculatorId, fn) {
  return async function(...args) {
    const startTime = performance.now();
    
    try {
      const result = await fn.apply(this, args);
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Record performance metrics
      performanceStore.recordCalculation(calculatorId, duration);
      
      // Log slow calculations
      if (duration > 100) {
        console.warn(`Slow calculation detected: ${calculatorId} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Record error
      performanceStore.recordError(error);
      
      console.error(`Calculator error in ${calculatorId} after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  };
}

/**
 * Memory usage monitoring
 */
export const memoryMonitor = {
  // Get current memory usage (if available)
  getCurrentUsage: () => {
    if ('memory' in performance) {
      return {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  },

  // Monitor memory leaks
  detectLeaks: () => {
    const initialUsage = memoryMonitor.getCurrentUsage();
    if (!initialUsage) return null;

    return {
      check: () => {
        const currentUsage = memoryMonitor.getCurrentUsage();
        if (!currentUsage) return null;

        const growth = currentUsage.used - initialUsage.used;
        const growthPercentage = (growth / initialUsage.used) * 100;

        return {
          growth,
          growthPercentage,
          isLeak: growthPercentage > 50 // Arbitrary threshold
        };
      }
    };
  }
};

/**
 * Bundle size monitoring
 */
export const bundleMonitor = {
  // Track loaded modules
  loadedModules: new Set(),

  // Record module load
  recordModuleLoad: (moduleName, size = 0) => {
    bundleMonitor.loadedModules.add({
      name: moduleName,
      size,
      timestamp: Date.now()
    });
  },

  // Get bundle statistics
  getStats: () => {
    const modules = Array.from(bundleMonitor.loadedModules);
    const totalSize = modules.reduce((sum, module) => sum + (module.size || 0), 0);
    
    return {
      moduleCount: modules.length,
      totalSize,
      averageSize: totalSize / modules.length || 0,
      modules
    };
  }
};

/**
 * Core Web Vitals monitoring
 */
export const webVitalsMonitor = {
  // Measure Largest Contentful Paint
  measureLCP: () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log('LCP:', lastEntry.startTime);
        
        // Record metric
        if (lastEntry.startTime > 2500) {
          console.warn('Poor LCP detected:', lastEntry.startTime);
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  },

  // Measure First Input Delay
  measureFID: () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (entry.processingStart - entry.startTime > 100) {
            console.warn('Poor FID detected:', entry.processingStart - entry.startTime);
          }
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  },

  // Measure Cumulative Layout Shift
  measureCLS: () => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        console.log('CLS:', clsValue);
        
        if (clsValue > 0.1) {
          console.warn('Poor CLS detected:', clsValue);
        }
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Initialize all Core Web Vitals monitoring
  init: () => {
    webVitalsMonitor.measureLCP();
    webVitalsMonitor.measureFID();
    webVitalsMonitor.measureCLS();
  }
};

/**
 * Calculator-specific performance optimizations
 */
export const calculatorOptimizations = {
  // Debounce calculator inputs to prevent excessive calculations
  debounceCalculation: (fn, delay = 300) => {
    let timeoutId;
    
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  // Memoize expensive calculations
  memoize: (fn, keyFn = (...args) => JSON.stringify(args)) => {
    const cache = new Map();
    
    return function(...args) {
      const key = keyFn(...args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = fn.apply(this, args);
      cache.set(key, result);
      
      // Limit cache size to prevent memory leaks
      if (cache.size > 100) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      return result;
    };
  },

  // Batch multiple calculations
  batchCalculations: (calculations, batchSize = 10) => {
    const batches = [];
    
    for (let i = 0; i < calculations.length; i += batchSize) {
      batches.push(calculations.slice(i, i + batchSize));
    }
    
    return batches.reduce(async (promise, batch) => {
      const results = await promise;
      
      // Process batch with small delay to prevent blocking
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const batchResults = await Promise.all(
        batch.map(calc => calc())
      );
      
      return [...results, ...batchResults];
    }, Promise.resolve([]));
  }
};

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  // Start Core Web Vitals monitoring
  webVitalsMonitor.init();
  
  // Monitor memory usage periodically
  if ('memory' in performance) {
    setInterval(() => {
      const usage = memoryMonitor.getCurrentUsage();
      if (usage && usage.used > usage.limit * 0.9) {
        console.warn('High memory usage detected:', usage);
      }
    }, 30000); // Check every 30 seconds
  }
  
  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry.duration, entry.name);
        }
      });
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  }
}