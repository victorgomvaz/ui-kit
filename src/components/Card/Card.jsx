import { classNames } from '../../utils/classNames';
import styles from './Card.module.css';

/**
 * Card Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.variant='default'] - Card variant: 'default', 'outlined', 'elevated'
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Other props passed to the card element
 * @returns {React.ReactElement} Card component
 *
 * @example
 * <Card>
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content</Card.Body>
 *   <Card.Footer>Footer</Card.Footer>
 * </Card>
 */
export function Card({ children, variant = 'default', className, ...rest }) {
  const cardClasses = classNames(
    styles.card,
    styles[`card--${variant}`],
    className
  );

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

/**
 * Card Header Component
 */
function CardHeader({ children, className, ...rest }) {
  return (
    <div className={classNames(styles.card__header, className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Card Body Component
 */
function CardBody({ children, className, ...rest }) {
  return (
    <div className={classNames(styles.card__body, className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Card Footer Component
 */
function CardFooter({ children, className, ...rest }) {
  return (
    <div className={classNames(styles.card__footer, className)} {...rest}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
