import { useState } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Avatar.module.css';

/**
 * Avatar Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.src] - Image source URL
 * @param {string} [props.alt] - Alt text for the image
 * @param {string} [props.name] - Name for fallback initials
 * @param {string} [props.size='md'] - Avatar size: 'sm', 'md', 'lg', 'xl'
 * @param {boolean} [props.loading=false] - Loading state
 * @param {React.ReactNode} [props.fallback] - Custom fallback content
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Other props passed to the avatar element
 * @returns {React.ReactElement} Avatar component
 *
 * @example
 * <Avatar src="/avatar.jpg" alt="User" name="John Doe" />
 * <Avatar name="Jane Smith" size="lg" />
 * <Avatar loading />
 */
export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  loading = false,
  fallback,
  className,
  ...rest
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!src);

  const avatarClasses = classNames(
    styles.avatar,
    styles[`avatar--${size}`],
    {
      [styles['avatar--loading']]: loading || imageLoading,
    },
    className
  );

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const showImage = src && !imageError && !loading;
  const showFallback = !showImage || imageError;

  return (
    <div className={avatarClasses} {...rest}>
      {showImage && (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={styles.avatar__image}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      {showFallback && (
        <div className={styles.avatar__fallback}>
          {loading || imageLoading ? (
            <div className={styles.avatar__spinner} aria-label="Loading">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="32"
                  strokeDashoffset="32"
                  opacity="0.5"
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
            </div>
          ) : fallback ? (
            fallback
          ) : name ? (
            <span className={styles.avatar__initials}>{getInitials(name)}</span>
          ) : (
            <svg
              className={styles.avatar__icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}
