/**
 * Theme Store - Centralized theme management
 * Handles dark mode, color schemes, and user preferences
 */

import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Theme configuration
const THEMES = {
  light: {
    name: 'Light',
    class: 'theme-light',
    colors: {
      primary: '#2563eb',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#0f172a'
    }
  },
  dark: {
    name: 'Dark',
    class: 'theme-dark',
    colors: {
      primary: '#3b82f6',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc'
    }
  },
  auto: {
    name: 'Auto',
    class: 'theme-auto',
    colors: null // Uses system preference
  }
};

// Create theme store
function createThemeStore() {
  const { subscribe, set, update } = writable('auto');

  return {
    subscribe,
    set,
    update,
    
    // Set theme and persist to localStorage
    setTheme: (theme) => {
      if (browser) {
        localStorage.setItem('kceva-theme', theme);
        document.documentElement.className = THEMES[theme]?.class || 'theme-auto';
      }
      set(theme);
    },
    
    // Toggle between light and dark
    toggle: () => {
      update(current => {
        const newTheme = current === 'light' ? 'dark' : 'light';
        if (browser) {
          localStorage.setItem('kceva-theme', newTheme);
          document.documentElement.className = THEMES[newTheme].class;
        }
        return newTheme;
      });
    },
    
    // Initialize theme from localStorage or system preference
    init: () => {
      if (!browser) return;
      
      const stored = localStorage.getItem('kceva-theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      let initialTheme = 'auto';
      
      if (stored && THEMES[stored]) {
        initialTheme = stored;
      } else if (systemPrefersDark) {
        initialTheme = 'dark';
      } else {
        initialTheme = 'light';
      }
      
      document.documentElement.className = THEMES[initialTheme].class;
      set(initialTheme);
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        update(current => {
          if (current === 'auto') {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.className = THEMES[newTheme].class;
            return newTheme;
          }
          return current;
        });
      });
    }
  };
}

export const theme = createThemeStore();

// Derived stores for theme properties
export const currentTheme = derived(theme, $theme => THEMES[$theme] || THEMES.auto);

export const isDarkMode = derived(theme, $theme => {
  if (!browser) return false;
  
  if ($theme === 'dark') return true;
  if ($theme === 'light') return false;
  
  // Auto mode - check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
});

// Color scheme utilities
export const colorScheme = derived([theme, isDarkMode], ([$theme, $isDark]) => {
  const baseColors = THEMES[$theme]?.colors;
  
  if (!baseColors) {
    // Auto mode - use appropriate colors based on system preference
    return $isDark ? THEMES.dark.colors : THEMES.light.colors;
  }
  
  return baseColors;
});

// Theme utilities
export const themeUtils = {
  // Get CSS custom property value
  getCSSVariable: (property) => {
    if (!browser) return '';
    return getComputedStyle(document.documentElement).getPropertyValue(property);
  },
  
  // Set CSS custom property
  setCSSVariable: (property, value) => {
    if (!browser) return;
    document.documentElement.style.setProperty(property, value);
  },
  
  // Apply theme colors to CSS variables
  applyThemeColors: (colors) => {
    if (!browser || !colors) return;
    
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-theme-${key}`, value);
    });
  }
};