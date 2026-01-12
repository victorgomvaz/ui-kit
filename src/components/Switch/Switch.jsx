import { forwardRef, useId } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Switch.module.css';

/**
 * Switch Component (Toggle)
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {boolean} [props.defaultChecked] - Uncontrolled default checked state
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.label] - Label text
 * @param {string} [props.name] - Switch name attribute
 * @param {string} [props.value] - Switch value attribute
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Switch ID (auto-generated if not provided)
 * @param {string} [props.size='md'] - Switch size: 'sm', 'md', 'lg'
 * @param {Object} [props.rest] - Other props passed to the switch element
 * @returns {React.ReactElement} Switch component
 *
 * @example
 * <Switch label="Enable notifications" />
 * <Switch checked={isEnabled} onChange={handleChange} label="Controlled" />
 */
export const Switch = forwardRef(
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
      size = 'md',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const switchId = id || generatedId;
    const labelId = label ? `${switchId}-label` : undefined;

    const switchClasses = classNames(
      styles.switch,
      styles[`switch--${size}`],
      {
        [styles['switch--disabled']]: disabled,
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
      <div className={switchClasses}>
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          role="switch"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          className={styles.switch__input}
          aria-labelledby={labelId}
          aria-checked={checked ?? defaultChecked ?? false}
          {...rest}
        />
        <label htmlFor={switchId} id={labelId} className={styles.switch__label}>
          <span className={styles.switch__track}>
            <span className={styles.switch__thumb}></span>
          </span>
          {label && <span className={styles.switch__text}>{label}</span>}
        </label>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
