import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

/**
 * Reusable Card component with optional hover effect
 *
 * Usage:
 * <Card hoverable onClick={handleClick}>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  onClick
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md p-6';
  const hoverStyles = hoverable
    ? 'cursor-pointer transition-shadow duration-200 hover:shadow-lg'
    : '';

  if (hoverable) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className={`${baseStyles} ${hoverStyles} ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
