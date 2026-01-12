/**
 * Accessibility utilities
 */

/**
 * Generates a unique ID for ARIA attributes
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
let idCounter = 0;
export function generateId(prefix = 'ui-kit') {
  return `${prefix}-${++idCounter}`;
}

/**
 * Checks if an element is focusable
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is focusable
 */
export function isFocusable(element) {
  if (!element) return false;

  const tabIndex = element.getAttribute('tabindex');
  if (tabIndex !== null && tabIndex !== '-1') return true;

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return element.matches(focusableSelectors);
}

/**
 * Gets all focusable elements within a container
 * @param {HTMLElement} container - Container element
 * @returns {HTMLElement[]} Array of focusable elements
 */
export function getFocusableElements(container) {
  if (!container) return [];

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors));
}

/**
 * Traps focus within a container element
 * @param {HTMLElement} container - Container to trap focus in
 * @param {HTMLElement} initialFocus - Element to focus initially
 * @returns {Function} Cleanup function
 */
export function trapFocus(container, initialFocus = null) {
  if (!container) return () => {};

  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return () => {};

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  container.addEventListener('keydown', handleTabKey);

  // Focus initial element or first focusable element
  if (initialFocus && isFocusable(initialFocus)) {
    initialFocus.focus();
  } else {
    firstElement.focus();
  }

  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
}
