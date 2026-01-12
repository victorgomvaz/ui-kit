import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../utils/classNames';
import { trapFocus, generateId } from '../../utils/a11y';
import { Button } from '../Button';
import styles from './Modal.module.css';

/**
 * Modal Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Close handler
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} [props.title] - Modal title
 * @param {React.ReactNode} [props.footer] - Footer content (or use Modal.Footer)
 * @param {boolean} [props.closeOnOverlayClick=true] - Close when clicking overlay
 * @param {boolean} [props.closeOnEscape=true] - Close on Escape key
 * @param {string} [props.size='md'] - Modal size: 'sm', 'md', 'lg', 'xl', 'full'
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Other props passed to the modal element
 * @returns {React.ReactElement|null} Modal component
 *
 * @example
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
 *   <Modal.Body>Content</Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </Modal.Footer>
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  children,
  title,
  footer,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = 'md',
  className,
  ...rest
}) {
  const modalRef = useRef(null);
  const titleId = useRef(generateId('modal-title'));
  const descriptionId = useRef(generateId('modal-description'));

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const cleanup = trapFocus(modalRef.current);
    return cleanup;
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalClasses = classNames(styles.modal, styles[`modal--${size}`], className);
  const overlayClasses = classNames(styles.modal__overlay);

  return createPortal(
    <div
      className={overlayClasses}
      onClick={handleOverlayClick}
      role="presentation"
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId.current : undefined}
        aria-describedby={descriptionId.current}
        {...rest}
      >
        {title && (
          <div className={styles.modal__header}>
            <h2 id={titleId.current} className={styles.modal__title}>
              {title}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={styles.modal__close}
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        )}
        <div id={descriptionId.current} className={styles.modal__body}>
          {children}
        </div>
        {footer && <div className={styles.modal__footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

/**
 * Modal Body Component
 */
function ModalBody({ children, className, ...rest }) {
  return (
    <div className={classNames(styles.modal__body, className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Modal Footer Component
 */
function ModalFooter({ children, className, ...rest }) {
  return (
    <div className={classNames(styles.modal__footer, className)} {...rest}>
      {children}
    </div>
  );
}

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
