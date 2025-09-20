/**
 * Accessibility Utilities for kceva Calculator Website
 * WCAG 2.1 AA compliance utilities and helpers
 */

/**
 * Keyboard navigation utilities
 */
export const keyboard = {
  /**
   * Handle keyboard navigation for calculator inputs
   * @param {Event} event - Keyboard event
   * @param {HTMLElement[]} elements - Array of focusable elements
   */
  handleCalculatorNavigation(event, elements) {
    const currentIndex = elements.findIndex(el => el === document.activeElement);
    
    switch (event.key) {
      case 'ArrowDown':
      case 'Tab':
        if (!event.shiftKey) {
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % elements.length;
          elements[nextIndex]?.focus();
        }
        break;
      case 'ArrowUp':
        if (event.shiftKey && event.key === 'Tab') {
          event.preventDefault();
          const prevIndex = (currentIndex - 1 + elements.length) % elements.length;
          elements[prevIndex]?.focus();
        }
        break;
      case 'Enter':
        if (event.target.type === 'button') {
          event.target.click();
        }
        break;
    }
  },

  /**
   * Trap focus within a modal or dialog
   * @param {HTMLElement} container - Container element
   */
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });

    firstElement?.focus();
  }
};

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Announce calculation results to screen readers
   * @param {string} result - Calculation result
   * @param {string} calculatorName - Name of calculator
   */
  announceResult(result, calculatorName) {
    const announcement = `${calculatorName} result: ${result}`;
    this.announce(announcement);
  },

  /**
   * Create live region for announcements
   * @param {string} message - Message to announce
   * @param {string} priority - 'polite' or 'assertive'
   */
  announce(message, priority = 'polite') {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = message;
    
    document.body.appendChild(liveRegion);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  },

  /**
   * Add descriptive labels to form inputs
   * @param {HTMLElement} input - Input element
   * @param {string} description - Description text
   */
  addInputDescription(input, description) {
    const descId = `desc-${Math.random().toString(36).substr(2, 9)}`;
    const descElement = document.createElement('div');
    descElement.id = descId;
    descElement.className = 'sr-only';
    descElement.textContent = description;
    
    input.parentNode.appendChild(descElement);
    input.setAttribute('aria-describedby', descId);
  }
};

/**
 * Color contrast utilities
 */
export const contrast = {
  /**
   * Calculate color contrast ratio
   * @param {string} color1 - First color (hex)
   * @param {string} color2 - Second color (hex)
   * @returns {number} Contrast ratio
   */
  calculateRatio(color1, color2) {
    const lum1 = this.getLuminance(color1);
    const lum2 = this.getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  /**
   * Get relative luminance of a color
   * @param {string} hex - Hex color code
   * @returns {number} Relative luminance
   */
  getLuminance(hex) {
    const rgb = this.hexToRgb(hex);
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },

  /**
   * Convert hex to RGB
   * @param {string} hex - Hex color code
   * @returns {number[]} RGB values
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  },

  /**
   * Check if color combination meets WCAG standards
   * @param {string} foreground - Foreground color
   * @param {string} background - Background color
   * @returns {Object} Compliance results
   */
  checkWCAGCompliance(foreground, background) {
    const ratio = this.calculateRatio(foreground, background);
    return {
      ratio: ratio,
      AA: ratio >= 4.5,
      AAA: ratio >= 7,
      level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail'
    };
  }
};

/**
 * Form accessibility utilities
 */
export const forms = {
  /**
   * Validate and enhance form accessibility
   * @param {HTMLFormElement} form - Form element
   */
  enhanceFormAccessibility(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Ensure all inputs have labels
      if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (!label && input.id) {
          console.warn(`Input ${input.id} missing label`);
        }
      }

      // Add required field indicators
      if (input.hasAttribute('required')) {
        input.setAttribute('aria-required', 'true');
      }

      // Enhance error messaging
      input.addEventListener('invalid', (e) => {
        const errorMsg = input.validationMessage;
        screenReader.announce(`Error: ${errorMsg}`, 'assertive');
      });
    });
  },

  /**
   * Add calculation result announcements
   * @param {HTMLElement} resultContainer - Container for results
   * @param {string} calculatorName - Name of calculator
   */
  addResultAnnouncements(resultContainer, calculatorName) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const resultText = resultContainer.textContent.trim();
          if (resultText) {
            screenReader.announceResult(resultText, calculatorName);
          }
        }
      });
    });

    observer.observe(resultContainer, {
      childList: true,
      subtree: true
    });
  }
};

/**
 * Mobile accessibility utilities
 */
export const mobile = {
  /**
   * Optimize touch targets for mobile
   */
  optimizeTouchTargets() {
    const buttons = document.querySelectorAll('button, a, input[type="button"]');
    
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        button.style.minWidth = '44px';
        button.style.minHeight = '44px';
        button.style.padding = '12px';
      }
    });
  },

  /**
   * Add swipe gestures for calculator navigation
   * @param {HTMLElement} container - Container element
   * @param {Function} onSwipe - Callback for swipe events
   */
  addSwipeGestures(container, onSwipe) {
    let startX, startY, endX, endY;

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    container.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        onSwipe(deltaX > 0 ? 'right' : 'left');
      }
    });
  }
};

/**
 * Initialize accessibility features
 */
export function initializeAccessibility() {
  // Add skip links
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Optimize touch targets on mobile
  if (window.innerWidth <= 768) {
    mobile.optimizeTouchTargets();
  }

  // Monitor for dynamic content changes
  const observer = new MutationObserver(() => {
    mobile.optimizeTouchTargets();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}