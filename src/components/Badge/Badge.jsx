import { classNames } from '../../utils/classNames';
import styles from './Badge.module.css';

/**
 * Badge Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} [props.tone='primary'] - Badge tone: 'primary', 'secondary', 'success', 'error', 'warning', 'neutral'
 * @param {string} [props.size='md'] - Badge size: 'sm', 'md', 'lg'
 * @param {string} [props.variant='solid'] - Badge variant: 'solid', 'outline', 'subtle'
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Other props passed to the badge element
 * @returns {React.ReactElement} Badge component
 *
 * @example
 * <Badge>New</Badge>
 * <Badge tone="success" variant="outline">Active</Badge>
 * <Badge tone="error" size="sm">3</Badge>
 */
export function Badge({
  children,
  tone = 'primary',
  size = 'md',
  variant = 'solid',
  className,
  ...rest
}) {
  const badgeClasses = classNames(
    styles.badge,
    styles[`badge--${tone}`],
    styles[`badge--${size}`],
    styles[`badge--${variant}`],
    className
  );

  return (
    <span className={badgeClasses} {...rest}>
      {children}
    </span>
  );
}
