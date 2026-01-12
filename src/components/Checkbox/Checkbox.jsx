import { forwardRef, useId } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Checkbox.module.css';

/**
 * Checkbox Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {boolean} [props.defaultChecked] - Uncontrolled default checked state
 * @param {boolean} [props.indeterminate=false] - Indeterminate state (shows dash)
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.label] - Label text
 * @param {string} [props.name] - Checkbox name attribute
 * @param {string} [props.value] - Checkbox value attribute
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Checkbox ID (auto-generated if not provided)
 * @param {Object} [props.rest] - Other props passed to the checkbox element
 * @returns {React.ReactElement} Checkbox component
 *
 * @example
 * <Checkbox label="Accept terms" />
 * <Checkbox checked={isChecked} onChange={handleChange} label="Controlled" />
 * <Checkbox indeterminate label="Indeterminate" />
 */
export const Checkbox = forwardRef(
  (
    {
      checked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      label,
      name,
      value,
      onChange,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const labelId = label ? `${checkboxId}-label` : undefined;

    const checkboxClasses = classNames(
      styles.checkbox,
      {
        [styles['checkbox--disabled']]: disabled,
        [styles['checkbox--indeterminate']]: indeterminate,
      },
      className
    );

    const handleChange = (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onChange?.(e);
    };

    return (
      <div className={checkboxClasses}>
        <input
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            if (node) {
              node.indeterminate = indeterminate;
            }
          }}
          id={checkboxId}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          className={styles.checkbox__input}
          aria-labelledby={labelId}
          aria-checked={indeterminate ? 'mixed' : checked}
          {...rest}
        />
        <label htmlFor={checkboxId} id={labelId} className={styles.checkbox__label}>
          <span className={styles.checkbox__box}>
            {indeterminate ? (
              <svg
                className={styles.checkbox__indeterminate}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg
                className={styles.checkbox__check}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 8l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {label && <span className={styles.checkbox__text}>{label}</span>}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
