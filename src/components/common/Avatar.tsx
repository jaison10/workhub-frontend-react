import React from 'react';
import { User as UserIcon } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackText?: string;
}

/**
 * Avatar component for user profile pictures
 *
 * Shows image if src provided, otherwise shows initials or icon
 *
 * Usage:
 * <Avatar src="/path/to/image.jpg" alt="John Doe" size="lg" />
 * <Avatar fallbackText="JD" size="md" />
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallbackText
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 32,
    xl: 48
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeStyles[size]} rounded-full object-cover border-2 border-gray-200`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeStyles[size]}
        rounded-full bg-gradient-to-br from-blue-400 to-blue-600
        flex items-center justify-center text-white font-semibold
        border-2 border-gray-200
      `}
    >
      {fallbackText ? (
        fallbackText.substring(0, 2).toUpperCase()
      ) : (
        <UserIcon size={iconSizes[size]} />
      )}
    </div>
  );
};
