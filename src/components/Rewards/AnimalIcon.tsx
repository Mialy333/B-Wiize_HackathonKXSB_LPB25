import React from 'react';
import { AnimalIconProps } from './types';
import { useTheme } from '../../ThemeContext';

export const AnimalIcon: React.FC<AnimalIconProps> = ({ animal, stage, className = '' }) => {
  const { isDark } = useTheme();
  
  // Mapping of animal emojis based on stage
  const animalEmojis: Record<string, Record<string, string>> = {
    tiger: {
      baby: '🐯',
      teenage: '🐅',
      adult: '🐅'
    },
    cat: {
      baby: '🐱',
      teenage: '😺',
      adult: '😸'
    },
    panther: {
      baby: '🐆',
      teenage: '🐆',
      adult: '🐆'
    },
    lynx: {
      baby: '🐱',
      teenage: '😼',
      adult: '😼'
    },
    lion: {
      baby: '🦁',
      teenage: '🦁',
      adult: '🦁'
    }
  };

  const emoji = animalEmojis[animal]?.[stage] || '🐾';
  const baseSize = stage === 'baby' ? 'text-4xl' : stage === 'teenage' ? 'text-5xl' : 'text-6xl';
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isDark ? 'from-purple-600/30 to-purple-800/30' : 'from-purple-200/50 to-purple-400/50'
      } rounded-full blur-lg transform scale-90`}></div>
      <div className={`relative flex items-center justify-center w-full h-full ${baseSize}`}>
        {emoji}
      </div>
    </div>
  );
};