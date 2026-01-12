import { forwardRef, useId } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Radio.module.css';

/**
 * Radio Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {boolean} [props.defaultChecked] - Uncontrolled default checked state
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.label] - Label text
 * @param {string} [props.name] - Radio group name (required for groups)
 * @param {string} [props.value] - Radio value attribute
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Radio ID (auto-generated if not provided)
 * @param {Object} [props.rest] - Other props passed to the radio element
 * @returns {React.ReactElement} Radio component
 *
 * @example
 * <Radio name="option" value="1" label="Option 1" />
 * <Radio name="option" value="2" label="Option 2" />
 */
export const Radio = forwardRef(
  (
    {
      checked,
      defaultChecked,
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
    const radioId = id || generatedId;
    const labelId = label ? `${radioId}-label` : undefined;

    const radioClasses = classNames(
      styles.radio,
      {
        [styles['radio--disabled']]: disabled,
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
      <div className={radioClasses}>
        <input
          ref={ref}
          id={radioId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          className={styles.radio__input}
          aria-labelledby={labelId}
          {...rest}
        />
        <label htmlFor={radioId} id={labelId} className={styles.radio__label}>
          <span className={styles.radio__circle}>
            <span className={styles.radio__dot}></span>
          </span>
          {label && <span className={styles.radio__text}>{label}</span>}
        </label>
      </div>
    );
  }
);

Radio.displayName = 'Radio';
