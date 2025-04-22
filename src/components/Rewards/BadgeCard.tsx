import React from 'react';
import { ExternalLink, Lock, Award } from 'lucide-react';
import { BadgeCardProps } from './types';
import { useTheme } from '../../ThemeContext';
import { AnimalIcon } from './AnimalIcon';

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge, onViewOnLedger, onCollect }) => {
  const { isDark } = useTheme();

  // Animation class based on badge stage and status
  const getAnimationClass = () => {
    if (badge.status !== 'Earned') return '';
    
    switch (badge.stage) {
      case 'baby': return 'animate-pulse';
      case 'teenage': return 'animate-bounce';
      case 'adult': return 'animate-float';
      default: return '';
    }
  };

  // Get background and shadow colors based on status
  const getStyles = () => {
    const baseClasses = 'group relative overflow-hidden rounded-xl transition-all duration-500 transform hover:scale-[1.02]';
    
    if (badge.status === 'Locked') {
      return `${baseClasses} ${isDark 
        ? 'bg-gray-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]' 
        : 'bg-gray-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]'
      }`;
    }

    // Extract colors from the badge's color gradient safely
    const colorMatch = badge.color.match(/from-(\w+)-\d+\s+to-(\w+)-\d+/);
    const startColor = colorMatch?.[1] || 'purple';
    const endColor = colorMatch?.[2] || 'purple';

    return `${baseClasses} ${isDark
      ? `bg-gray-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_10px_-3px_var(--tw-${startColor}-500),0_2px_4px_-2px_var(--tw-${endColor}-500)]`
      : `bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_4px_10px_-3px_var(--tw-${startColor}-500),0_2px_4px_-2px_var(--tw-${endColor}-500)]`
    }`;
  };

  return (
    <div className={getStyles()}>
      {/* Badge Container */}
      <div className="relative p-6">
        {/* Badge Icon */}
        <div className={`relative w-24 h-24 mx-auto mb-4 ${getAnimationClass()}`}>
          {badge.status === 'Locked' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full">
              <Lock className={`w-10 h-10 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500`} />
              <div className={`relative flex items-center justify-center w-full h-full bg-gradient-to-br ${badge.color} rounded-full transform transition-transform duration-500 group-hover:rotate-12`}>
                <AnimalIcon 
                  animal={badge.animal} 
                  stage={badge.stage} 
                  className="w-full h-full p-2"
                />
              </div>
            </>
          )}
        </div>

        {/* Badge Content */}
        <div className="text-center space-y-2">
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {badge.title}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {badge.description}
          </p>

          {/* Progress Bar */}
          {badge.status === 'In Progress' && badge.progress !== undefined && badge.total !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Progress
                </span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {badge.progress}/{badge.total}
                </span>
              </div>
              <div className={`h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${badge.color} transition-all duration-500`}
                  style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="mt-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              badge.status === 'Earned'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : badge.status === 'In Progress'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
            }`}>
              {badge.status}
            </span>
          </div>

          {/* Token ID */}
          {badge.status === 'Earned' && (
            <div className="mt-3">
              <code className={`text-xs font-mono ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                {badge.tokenId}
              </code>
            </div>
          )}

          {/* Action Button */}
          {badge.status === 'Earned' ? (
            <button
              onClick={() => onViewOnLedger?.(badge.tokenId)}
              className={`mt-3 w-full flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              <ExternalLink className="w-4 h-4 mr-1.5" />
              View on XRP Ledger
            </button>
          ) : badge.status === 'In Progress' ? (
            <button
              onClick={() => onCollect?.(badge.id)}
              className={`mt-3 w-full flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-teal-600/20 text-teal-400 hover:bg-teal-600/30'
                  : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
              }`}
              disabled={badge.progress < badge.total}
            >
              <Award className="w-4 h-4 mr-1.5" />
              {badge.progress >= badge.total ? 'Collect NFT' : 'In Progress'}
            </button>
          ) : null}
        </div>
      </div>

      {/* Background Glow Effect */}
      {badge.status === 'Earned' && (
        <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
      )}
    </div>
  );
};