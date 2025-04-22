import React from 'react';
import { Calendar, Trophy } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
}

interface DailyChallengesWidgetProps {
  challenges: DailyChallenge[];
  onComplete?: (challengeId: string) => void;
  isLoading?: boolean;
}

export const DailyChallengesWidget: React.FC<DailyChallengesWidgetProps> = ({
  challenges,
  onComplete,
  isLoading = false
}) => {
  const { isDark } = useTheme();

  if (isLoading) {
    return (
      <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      } shadow-sm hover:shadow-md`}>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
              Today's Tasks
            </h3>
          </div>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4 mb-2`} />
                    <div className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2`} />
                  </div>
                  <div className={`h-8 w-20 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!challenges || challenges.length === 0) {
    return (
      <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      } shadow-sm hover:shadow-md`}>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
              Today's Tasks
            </h3>
          </div>
          <div className="text-center py-8">
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              No tasks for today. Check back tomorrow!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    } shadow-sm hover:shadow-md`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
              Today's Tasks
            </h3>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs ${
            isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'
          }`}>
            Refreshes in 12:34:56
          </div>
        </div>
        
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`p-3 rounded-lg ${
                challenge.completed
                  ? isDark ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50 border border-green-200'
                  : isDark ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {challenge.title}
                  </h4>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {challenge.description}
                  </p>
                </div>
                <div className="ml-4 flex flex-col items-end">
                  <div className="flex items-center">
                    <Trophy className={`w-3 h-3 mr-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <span className={`text-xs font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                      +{challenge.xp} XP
                    </span>
                  </div>
                  <button
                    onClick={() => !challenge.completed && onComplete?.(challenge.id)}
                    disabled={challenge.completed}
                    className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                      challenge.completed
                        ? isDark ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                        : isDark
                        ? 'bg-gray-600 hover:bg-gray-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {challenge.completed ? 'Completed' : 'Complete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};