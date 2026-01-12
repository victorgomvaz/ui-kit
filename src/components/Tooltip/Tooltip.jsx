import { useState, useRef, useEffect } from 'react';
import { classNames } from '../../utils/classNames';
import { generateId } from '../../utils/a11y';
import styles from './Tooltip.module.css';

/**
 * Tooltip Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Element that triggers the tooltip
 * @param {string} props.content - Tooltip content
 * @param {string} [props.position='top'] - Tooltip position: 'top', 'bottom', 'left', 'right'
 * @param {boolean} [props.disabled=false] - Disables the tooltip
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Other props passed to the tooltip wrapper
 * @returns {React.ReactElement} Tooltip component
 *
 * @example
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 */
export function Tooltip({
  children,
  content,
  position = 'top',
  disabled = false,
  className,
  ...rest
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipId] = useState(() => generateId('tooltip'));
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isVisible || disabled) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible, disabled]);

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsVisible(true);
    }
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  const wrapperClasses = classNames(styles.tooltip__wrapper, className);

  return (
    <div
      ref={wrapperRef}
      className={wrapperClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      {children}
      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={classNames(styles.tooltip, styles[`tooltip--${position}`])}
          aria-live="polite"
        >
          {content}
        </div>
      )}
    </div>
  );
}
