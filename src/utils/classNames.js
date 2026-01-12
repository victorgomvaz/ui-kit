/**
 * Utility function to combine class names
 * @param {...(string|object|Array)} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function classNames(...classes) {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'string') return cls;
      if (Array.isArray(cls)) return classNames(...cls);
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}
