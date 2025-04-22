import React from 'react';
import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react';
import { Challenge } from './types';
import { useTheme } from '../../ThemeContext';

interface ChallengeCardProps {
  challenge: Challenge;
  type: 'current' | 'upcoming';
  onJoin?: (challengeId: string) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, type, onJoin }) => {
  const { isDark } = useTheme();
  const date = new Date(challenge.date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate progress percentage
  const progressPercentage = challenge.progress 
    ? (challenge.progress.current / challenge.progress.total) * 100 
    : 0;

  return (
    <div className={`overflow-hidden rounded-lg transition-all duration-300 group hover:shadow-lg ${
      isDark ? 'bg-gray-800/90 hover:bg-gray-700/90' : 'bg-white/90 hover:bg-white/95'
    }`}>
      {/* Challenge Image */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <img 
          src={challenge.backgroundImage} 
          alt={challenge.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className={`absolute inset-0 ${
          isDark ? 'bg-gradient-to-b from-transparent to-gray-800/90' : 'bg-gradient-to-b from-transparent to-white/90'
        }`} />
        
        {/* Badge Indicator */}
        {challenge.reward.badge && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-purple-600/80 backdrop-blur-sm text-white text-xs font-medium">
            {challenge.reward.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {challenge.title}
            </h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {challenge.description}
            </p>
          </div>
          <button
            onClick={() => onJoin?.(challenge.id)}
            className={`ml-4 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              type === 'current'
                ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-[0_0_15px_rgba(22,163,74,0.3)]'
                : isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {type === 'current' ? 'Join' : 'Preview'}
          </button>
        </div>

        {/* Progress Bar (if available) */}
        {challenge.progress && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Progress
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                ${challenge.progress.current}/${challenge.progress.total}
              </span>
            </div>
            <div className={`h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className={`h-full rounded-full bg-teal-500 transition-all duration-500`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className={`w-4 h-4 mr-1.5 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`} />
            <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>
              {type === 'current' ? 'Due: ' : 'Starts: '}{formattedDate}
            </span>
          </div>
          <div className="flex items-center">
            <Trophy className={`w-4 h-4 mr-1.5 ${
              isDark ? 'text-purple-300' : 'text-purple-600'
            }`} />
            <span className={`font-medium ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
              {challenge.reward.xp} XP
            </span>
          </div>
          <div className="flex items-center">
            <Users className={`w-4 h-4 mr-1.5 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`} />
            <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>
              {challenge.participants} student{challenge.participants !== 1 ? 's' : ''} 
              {type === 'current' ? ' in' : ' in queue'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};