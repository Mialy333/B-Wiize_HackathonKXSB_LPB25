import React from 'react';

interface CatIconProps {
  className?: string;
  size?: number;
}

export const CatIcon: React.FC<CatIconProps> = ({ className = '', size = 24 }) => (
  <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <span style={{ fontSize: `${size * 1.5}px`, lineHeight: 1 }}>🐱</span>
  </div>
);