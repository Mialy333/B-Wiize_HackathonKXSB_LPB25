import React from 'react';
import { Trophy } from 'lucide-react';
import { DailyChallenge } from './types';
import { useTheme } from '../../ThemeContext';

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
  onComplete?: (challengeId: string) => void;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  challenge,
  onComplete
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`p-4 rounded-lg ${
      challenge.completed
        ? isDark ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50 border border-green-200'
        : isDark ? 'bg-gray-700/50' : 'bg-gray-50'
    }`}>
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {challenge.title}
          </h3>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {challenge.description}
          </p>
          
          <div className="flex items-center mt-3">
            <Trophy className={`w-4 h-4 mr-1.5 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <span className={`text-sm font-medium ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>
              +{challenge.xp} XP
            </span>
          </div>
        </div>
        
        <div className="ml-4">
          <button
            onClick={() => !challenge.completed && onComplete?.(challenge.id)}
            disabled={challenge.completed}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              challenge.completed
                ? isDark
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white'
                : isDark
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-teal-500 hover:bg-teal-600 text-white'
            }`}
          >
            {challenge.completed ? 'Completed' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};