import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  size?: 'sm' | 'md';
}

/**
 * Badge component for tags and labels
 *
 * Usage:
 * <Badge variant="blue">React</Badge>
 * <Badge variant="green" size="sm">Active</Badge>
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md'
}) => {
  const variantStyles = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
};
