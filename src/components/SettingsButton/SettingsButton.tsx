import React from 'react';
import { Settings } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

interface SettingsButtonProps {
  onClick: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
  const { isDark } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`md:hidden fixed top-4 right-4 z-50 p-2.5 rounded-full shadow-lg transition-colors ${
        isDark
          ? 'bg-gray-800 text-purple-400 hover:bg-gray-700'
          : 'bg-white text-purple-600 hover:bg-gray-100'
      }`}
    >
      <Settings className="w-5 h-5" />
    </button>
  );
};