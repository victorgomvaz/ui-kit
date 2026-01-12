import { classNames } from '../../utils/classNames';
import styles from './Spinner.module.css';

/**
 * Spinner Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Spinner size: 'sm', 'md', 'lg'
 * @param {string} [props.tone='primary'] - Spinner color tone: 'primary', 'secondary', 'neutral', 'success', 'error', 'warning'
 * @param {string} [props.label] - Accessible label for screen readers
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Other props passed to the spinner element
 * @returns {React.ReactElement} Spinner component
 *
 * @example
 * <Spinner size="md" tone="primary" />
 * <Spinner size="lg" tone="success" label="Loading data..." />
 */
export function Spinner({
  size = 'md',
  tone = 'primary',
  label = 'Loading...',
  className,
  ...rest
}) {
  const spinnerClasses = classNames(
    styles.spinner,
    styles[`spinner--${size}`],
    styles[`spinner--${tone}`],
    className
  );

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-live="polite"
      aria-label={label}
      {...rest}
    >
      <svg
        className={styles.spinner__svg}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          className={styles.spinner__circle}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="32"
          strokeDashoffset="32"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            values="0 32;16 16;0 32;0 32"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            values="0;-16;-32;-32"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <span className={styles['spinner__sr-only']}>{label}</span>
    </div>
  );
}
