/**
 * Calculator Store - Global state management for calculator functionality
 * Handles calculator history, favorites, and user preferences
 */

import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Calculator history entry interface
/**
 * @typedef {Object} CalculatorHistoryEntry
 * @property {string} id - Unique identifier
 * @property {string} calculatorId - Calculator type
 * @property {string} calculatorName - Display name
 * @property {Object} inputs - Input values used
 * @property {Object} results - Calculation results
 * @property {Date} timestamp - When calculation was performed
 * @property {boolean} favorited - Whether user favorited this calculation
 */

// Create calculator history store
function createCalculatorHistoryStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    
    // Add calculation to history
    addCalculation: (calculatorId, calculatorName, inputs, results) => {
      const entry = {
        id: `calc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        calculatorId,
        calculatorName,
        inputs: { ...inputs },
        results: { ...results },
        timestamp: new Date(),
        favorited: false
      };
      
      update(history => {
        const newHistory = [entry, ...history.slice(0, 49)]; // Keep last 50 entries
        
        if (browser) {
          try {
            localStorage.setItem('kceva-calculator-history', JSON.stringify(newHistory));
          } catch (error) {
            console.warn('Failed to save calculator history:', error);
          }
        }
        
        return newHistory;
      });
      
      return entry.id;
    },
    
    // Remove calculation from history
    removeCalculation: (id) => {
      update(history => {
        const newHistory = history.filter(entry => entry.id !== id);
        
        if (browser) {
          localStorage.setItem('kceva-calculator-history', JSON.stringify(newHistory));
        }
        
        return newHistory;
      });
    },
    
    // Toggle favorite status
    toggleFavorite: (id) => {
      update(history => {
        const newHistory = history.map(entry => 
          entry.id === id ? { ...entry, favorited: !entry.favorited } : entry
        );
        
        if (browser) {
          localStorage.setItem('kceva-calculator-history', JSON.stringify(newHistory));
        }
        
        return newHistory;
      });
    },
    
    // Clear all history
    clearHistory: () => {
      if (browser) {
        localStorage.removeItem('kceva-calculator-history');
      }
      set([]);
    },
    
    // Load history from localStorage
    loadHistory: () => {
      if (!browser) return;
      
      try {
        const stored = localStorage.getItem('kceva-calculator-history');
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert timestamp strings back to Date objects
          const history = parsed.map(entry => ({
            ...entry,
            timestamp: new Date(entry.timestamp)
          }));
          set(history);
        }
      } catch (error) {
        console.warn('Failed to load calculator history:', error);
      }
    }
  };
}

export const calculatorHistory = createCalculatorHistoryStore();

// Derived stores
export const favoriteCalculations = derived(
  calculatorHistory,
  $history => $history.filter(entry => entry.favorited)
);

export const recentCalculations = derived(
  calculatorHistory,
  $history => $history.slice(0, 10)
);

export const calculatorUsageStats = derived(
  calculatorHistory,
  $history => {
    const stats = {};
    
    $history.forEach(entry => {
      if (!stats[entry.calculatorId]) {
        stats[entry.calculatorId] = {
          count: 0,
          name: entry.calculatorName,
          lastUsed: entry.timestamp
        };
      }
      
      stats[entry.calculatorId].count++;
      
      if (entry.timestamp > stats[entry.calculatorId].lastUsed) {
        stats[entry.calculatorId].lastUsed = entry.timestamp;
      }
    });
    
    return Object.entries(stats)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count);
  }
);

// User preferences store
function createUserPreferencesStore() {
  const defaultPreferences = {
    currency: 'USD',
    units: 'metric', // metric or imperial
    decimalPlaces: 2,
    thousandsSeparator: true,
    autoSave: true,
    showTooltips: true,
    compactMode: false,
    highContrast: false
  };

  const { subscribe, set, update } = writable(defaultPreferences);

  return {
    subscribe,
    
    // Update specific preference
    updatePreference: (key, value) => {
      update(prefs => {
        const newPrefs = { ...prefs, [key]: value };
        
        if (browser) {
          localStorage.setItem('kceva-user-preferences', JSON.stringify(newPrefs));
        }
        
        return newPrefs;
      });
    },
    
    // Reset to defaults
    reset: () => {
      if (browser) {
        localStorage.removeItem('kceva-user-preferences');
      }
      set(defaultPreferences);
    },
    
    // Load preferences from localStorage
    load: () => {
      if (!browser) return;
      
      try {
        const stored = localStorage.getItem('kceva-user-preferences');
        if (stored) {
          const parsed = JSON.parse(stored);
          set({ ...defaultPreferences, ...parsed });
        }
      } catch (error) {
        console.warn('Failed to load user preferences:', error);
      }
    }
  };
}

export const userPreferences = createUserPreferencesStore();

// Application state store
function createAppStateStore() {
  const { subscribe, set, update } = writable({
    isLoading: false,
    currentCalculator: null,
    sidebarOpen: false,
    mobileMenuOpen: false,
    searchQuery: '',
    searchResults: [],
    notifications: []
  });

  return {
    subscribe,
    
    // Loading state
    setLoading: (loading) => {
      update(state => ({ ...state, isLoading: loading }));
    },
    
    // Current calculator
    setCurrentCalculator: (calculator) => {
      update(state => ({ ...state, currentCalculator: calculator }));
    },
    
    // Sidebar state
    toggleSidebar: () => {
      update(state => ({ ...state, sidebarOpen: !state.sidebarOpen }));
    },
    
    setSidebarOpen: (open) => {
      update(state => ({ ...state, sidebarOpen: open }));
    },
    
    // Mobile menu state
    toggleMobileMenu: () => {
      update(state => ({ ...state, mobileMenuOpen: !state.mobileMenuOpen }));
    },
    
    setMobileMenuOpen: (open) => {
      update(state => ({ ...state, mobileMenuOpen: open }));
    },
    
    // Search state
    setSearchQuery: (query) => {
      update(state => ({ ...state, searchQuery: query }));
    },
    
    setSearchResults: (results) => {
      update(state => ({ ...state, searchResults: results }));
    },
    
    // Notifications
    addNotification: (notification) => {
      const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newNotification = {
        id,
        type: 'info',
        title: '',
        message: '',
        duration: 5000,
        ...notification,
        timestamp: new Date()
      };
      
      update(state => ({
        ...state,
        notifications: [...state.notifications, newNotification]
      }));
      
      // Auto-remove notification after duration
      if (newNotification.duration > 0) {
        setTimeout(() => {
          update(state => ({
            ...state,
            notifications: state.notifications.filter(n => n.id !== id)
          }));
        }, newNotification.duration);
      }
      
      return id;
    },
    
    removeNotification: (id) => {
      update(state => ({
        ...state,
        notifications: state.notifications.filter(n => n.id !== id)
      }));
    },
    
    clearNotifications: () => {
      update(state => ({ ...state, notifications: [] }));
    }
  };
}

export const appState = createAppStateStore();

// Derived stores for common UI states
export const isLoading = derived(appState, $state => $state.isLoading);
export const currentCalculator = derived(appState, $state => $state.currentCalculator);
export const sidebarOpen = derived(appState, $state => $state.sidebarOpen);
export const mobileMenuOpen = derived(appState, $state => $state.mobileMenuOpen);
export const notifications = derived(appState, $state => $state.notifications);

// Performance monitoring store
function createPerformanceStore() {
  const { subscribe, set, update } = writable({
    calculationTimes: {},
    averageCalculationTime: 0,
    slowCalculations: [],
    errorCount: 0,
    lastError: null
  });

  return {
    subscribe,
    
    // Record calculation performance
    recordCalculation: (calculatorId, duration) => {
      update(state => {
        const times = state.calculationTimes[calculatorId] || [];
        const newTimes = [...times, duration].slice(-10); // Keep last 10 measurements
        
        const average = newTimes.reduce((sum, time) => sum + time, 0) / newTimes.length;
        
        const newState = {
          ...state,
          calculationTimes: {
            ...state.calculationTimes,
            [calculatorId]: newTimes
          },
          averageCalculationTime: average
        };
        
        // Track slow calculations (>100ms)
        if (duration > 100) {
          newState.slowCalculations = [
            ...state.slowCalculations,
            { calculatorId, duration, timestamp: new Date() }
          ].slice(-20); // Keep last 20 slow calculations
        }
        
        return newState;
      });
    },
    
    // Record error
    recordError: (error) => {
      update(state => ({
        ...state,
        errorCount: state.errorCount + 1,
        lastError: {
          message: error.message,
          timestamp: new Date(),
          stack: error.stack
        }
      }));
    },
    
    // Get performance metrics
    getMetrics: () => {
      let metrics = {};
      
      subscribe(state => {
        metrics = {
          totalCalculations: Object.values(state.calculationTimes)
            .reduce((sum, times) => sum + times.length, 0),
          averageTime: state.averageCalculationTime,
          slowCalculationCount: state.slowCalculations.length,
          errorRate: state.errorCount / Math.max(1, Object.values(state.calculationTimes)
            .reduce((sum, times) => sum + times.length, 0)),
          lastError: state.lastError
        };
      })();
      
      return metrics;
    }
  };
}

export const performance = createPerformanceStore();