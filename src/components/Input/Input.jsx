import { forwardRef, useId } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Input.module.css';

/**
 * Input Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Input type: 'text', 'email', 'password', 'number', etc.
 * @param {string} [props.size='md'] - Input size: 'sm', 'md', 'lg'
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.error=false] - Error state (shows error styling)
 * @param {string} [props.errorMessage] - Error message to display
 * @param {string} [props.label] - Label text
 * @param {string} [props.helperText] - Helper text below input
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.value] - Controlled value
 * @param {string} [props.defaultValue] - Uncontrolled default value
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onBlur] - Blur handler
 * @param {Function} [props.onFocus] - Focus handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Input ID (auto-generated if not provided)
 * @param {boolean} [props.required=false] - Required field
 * @param {string} [props.name] - Input name attribute
 * @param {Object} [props.rest] - Other props passed to the input element
 * @returns {React.ReactElement} Input component
 *
 * @example
 * <Input label="Email" type="email" placeholder="Enter your email" />
 * <Input error errorMessage="This field is required" />
 */
export const Input = forwardRef(
  (
    {
      type = 'text',
      size = 'md',
      disabled = false,
      error = false,
      errorMessage,
      label,
      helperText,
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      className,
      id,
      required = false,
      name,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const labelId = label ? `${inputId}-label` : undefined;

    const inputClasses = classNames(
      styles.input,
      styles[`input--${size}`],
      {
        [styles['input--error']]: error,
        [styles['input--disabled']]: disabled,
      },
      className
    );

    const wrapperClasses = classNames(styles.input__wrapper, {
      [styles['input__wrapper--error']]: error,
    });

    return (
      <div className={styles.input__container}>
        {label && (
          <label htmlFor={inputId} id={labelId} className={styles.input__label}>
            {label}
            {required && <span className={styles.input__required}>*</span>}
          </label>
        )}
        <div className={wrapperClasses}>
          <input
            ref={ref}
            id={inputId}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            className={inputClasses}
            aria-invalid={error}
            aria-describedby={classNames(errorId, helperId)}
            aria-labelledby={labelId}
            {...rest}
          />
        </div>
        {error && errorMessage && (
          <div id={errorId} className={styles.input__error} role="alert">
            {errorMessage}
          </div>
        )}
        {!error && helperText && (
          <div id={helperId} className={styles.input__helper}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
