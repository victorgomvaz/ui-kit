import { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Button.module.css';

/**
 * Button Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Button variant: 'primary', 'secondary', 'outline', 'ghost', 'danger'
 * @param {string} [props.size='md'] - Button size: 'sm', 'md', 'lg'
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.loading=false] - Loading state (shows spinner)
 * @param {boolean} [props.fullWidth=false] - Full width button
 * @param {string} [props.type='button'] - Button type: 'button', 'submit', 'reset'
 * @param {string} [props.as] - Render as different element (polymorphic)
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Other props passed to the button element
 * @returns {React.ReactElement} Button component
 *
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" disabled>Disabled</Button>
 * <Button loading>Loading...</Button>
 */
export const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      type = 'button',
      as: Component = 'button',
      onClick,
      className,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const handleClick = (e) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const buttonClasses = classNames(
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      {
        [styles['button--disabled']]: isDisabled,
        [styles['button--loading']]: loading,
        [styles['button--full-width']]: fullWidth,
      },
      className
    );

    return (
      <Component
        ref={ref}
        type={Component === 'button' ? type : undefined}
        className={buttonClasses}
        disabled={isDisabled}
        onClick={handleClick}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...rest}
      >
        {loading && (
          <span className={styles['button__spinner']} aria-hidden="true">
            <svg
              className={styles['button__spinner-svg']}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className={styles['button__spinner-circle']}
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
          </span>
        )}
        <span className={loading ? styles['button__content--loading'] : undefined}>
          {children}
        </span>
      </Component>
    );
  }
);

Button.displayName = 'Button';
