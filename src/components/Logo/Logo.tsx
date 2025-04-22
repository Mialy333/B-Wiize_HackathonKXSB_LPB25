import React from 'react';
import { useTheme } from '../../ThemeContext';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true, className = '' }) => {
  const { isDark } = useTheme();
  
  const sizeMap = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16'
  };
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeMap[size]} aspect-[3/1] relative bg-brand-purple rounded-xl overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">B-wiize</span>
        </div>
      </div>
    </div>
  );
};