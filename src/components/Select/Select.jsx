import { forwardRef, useId, useState, useRef, useEffect } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Select.module.css';

/**
 * Select Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<{value: string, label: string}>} props.options - Select options
 * @param {string} [props.value] - Controlled selected value
 * @param {string} [props.defaultValue] - Uncontrolled default value
 * @param {string} [props.size='md'] - Select size: 'sm', 'md', 'lg'
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.error=false] - Error state
 * @param {string} [props.errorMessage] - Error message
 * @param {string} [props.label] - Label text
 * @param {string} [props.helperText] - Helper text
 * @param {string} [props.placeholder] - Placeholder text
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Select ID (auto-generated if not provided)
 * @param {boolean} [props.required=false] - Required field
 * @param {string} [props.name] - Select name attribute
 * @param {Object} [props.rest] - Other props passed to the select element
 * @returns {React.ReactElement} Select component
 *
 * @example
 * <Select
 *   label="Choose option"
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 * />
 */
export const Select = forwardRef(
  (
    {
      options = [],
      value,
      defaultValue,
      size = 'md',
      disabled = false,
      error = false,
      errorMessage,
      label,
      helperText,
      placeholder = 'Select an option...',
      onChange,
      className,
      id,
      required = false,
      name,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = error ? `${selectId}-error` : undefined;
    const helperId = helperText ? `${selectId}-helper` : undefined;
    const labelId = label ? `${selectId}-label` : undefined;

    const selectClasses = classNames(
      styles.select,
      styles[`select--${size}`],
      {
        [styles['select--error']]: error,
        [styles['select--disabled']]: disabled,
      },
      className
    );

    const wrapperClasses = classNames(styles.select__wrapper, {
      [styles['select__wrapper--error']]: error,
    });

    const selectedOption = options.find((opt) => opt.value === (value ?? defaultValue));

    return (
      <div className={styles.select__container}>
        {label && (
          <label htmlFor={selectId} id={labelId} className={styles.select__label}>
            {label}
            {required && <span className={styles.select__required}>*</span>}
          </label>
        )}
        <div className={wrapperClasses}>
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            onChange={onChange}
            className={selectClasses}
            aria-invalid={error}
            aria-describedby={classNames(errorId, helperId)}
            aria-labelledby={labelId}
            {...rest}
          >
            {!value && !defaultValue && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.select__icon} aria-hidden="true">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {error && errorMessage && (
          <div id={errorId} className={styles.select__error} role="alert">
            {errorMessage}
          </div>
        )}
        {!error && helperText && (
          <div id={helperId} className={styles.select__helper}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
