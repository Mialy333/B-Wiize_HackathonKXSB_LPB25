import React, { useState } from 'react';
import { Unit } from './types';
import { useTheme } from '../../ThemeContext';
import { Play, FastForward, CheckCircle, Lock, Trophy, Cat, ThumbsUp, ThumbsDown } from 'lucide-react';
import { QuizModal } from './QuizModal';

interface UnitCardProps {
  unit: Unit;
  isLast: boolean;
  isActive?: boolean;
  onStart?: (unitId: number) => void;
  onQuizComplete?: (unitId: number, score: number) => void;
  votes: { up: number; down: number };
  onVote?: (voteType: 'up' | 'down') => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  isLast,
  isActive = false,
  onStart,
  onQuizComplete,
  votes,
  onVote
}) => {
  const { isDark } = useTheme();
  const Icon = unit.icon;
  const [showQuiz, setShowQuiz] = useState(false);

  const getStatusColors = () => {
    if (isActive) {
      return {
        bg: isDark ? 'bg-purple-900/30' : 'bg-purple-50',
        border: isDark ? 'border-purple-500' : 'border-purple-400',
        icon: isDark ? 'text-purple-400' : 'text-purple-500',
        progress: isDark ? 'bg-purple-500' : 'bg-purple-400'
      };
    }
    
    switch (unit.status) {
      case 'completed':
        return {
          bg: isDark ? 'bg-green-900/30' : 'bg-green-50',
          border: isDark ? 'border-green-500' : 'border-green-400',
          icon: isDark ? 'text-green-400' : 'text-green-500',
          progress: isDark ? 'bg-green-500' : 'bg-green-400'
        };
      case 'in-progress':
        return {
          bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50',
          border: isDark ? 'border-blue-500' : 'border-blue-400',
          icon: isDark ? 'text-blue-400' : 'text-blue-500',
          progress: isDark ? 'bg-blue-500' : 'bg-blue-400'
        };
      default:
        return {
          bg: isDark ? 'bg-gray-800' : 'bg-gray-100',
          border: isDark ? 'border-gray-700' : 'border-gray-300',
          icon: isDark ? 'text-gray-500' : 'text-gray-400',
          progress: isDark ? 'bg-gray-700' : 'bg-gray-300'
        };
    }
  };

  const colors = getStatusColors();

  const handleQuizComplete = (score: number) => {
    setShowQuiz(false);
    onQuizComplete?.(unit.id, score);
  };

  // Determine if this unit earns a cat badge
  const getCatBadge = () => {
    if (unit.quiz.reward.badge === 'Kitten Learner') return 'Kitten Learner';
    if (unit.quiz.reward.badge === 'Curious Feline') return 'Curious Feline';
    if (unit.quiz.reward.badge === 'Wise Whiskers') return 'Wise Whiskers';
    return null;
  };

  const catBadge = getCatBadge();

  return (
    <>
      <div className="relative">
        <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${colors.bg} ${colors.border} ${isActive ? 'transform scale-[1.02] shadow-lg' : ''}`}>
          {/* Icon and Title Section */}
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white'} ${colors.icon}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {unit.title}
              </h3>
              <div className="flex items-center mt-1">
                {unit.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500 mr-2" />}
                {unit.status === 'locked' && <Lock className="w-4 h-4 text-gray-400 mr-2" />}
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {unit.progress.current}/{unit.progress.total} lessons
                </span>
                
                {/* XP Indicator */}
                <span className={`ml-3 text-sm font-medium ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  +{unit.xp} XP
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {unit.description}
          </p>
          
          {/* Voting System */}
          <div className="flex items-center mb-4">
            <button
              onClick={() => onVote?.('up')}
              disabled={unit.status === 'locked'}
              className={`flex items-center p-1 rounded transition-colors ${
                unit.status === 'locked'
                  ? isDark ? 'text-gray-600' : 'text-gray-400'
                  : isDark
                  ? 'text-teal-400 hover:bg-gray-700'
                  : 'text-teal-600 hover:bg-gray-100'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="ml-1 text-sm font-medium">{votes.up}</span>
            </button>
            <span className={`mx-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>|</span>
            <button
              onClick={() => onVote?.('down')}
              disabled={unit.status === 'locked'}
              className={`flex items-center p-1 rounded transition-colors ${
                unit.status === 'locked'
                  ? isDark ? 'text-gray-600' : 'text-gray-400'
                  : isDark
                  ? 'text-teal-400 hover:bg-gray-700'
                  : 'text-teal-600 hover:bg-gray-100'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span className="ml-1 text-sm font-medium">{votes.down}</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} mb-4`}>
            <div
              className={`h-full rounded-full transition-all duration-500 ${colors.progress}`}
              style={{ width: `${(unit.progress.current / unit.progress.total) * 100}%` }}
            />
          </div>

          {/* Cat Badge (if applicable) */}
          {catBadge && (
            <div className={`mb-4 p-3 rounded-lg ${
              isDark ? 'bg-purple-900/30' : 'bg-purple-50'
            }`}>
              <div className="flex items-center">
                <Cat className={`w-4 h-4 mr-2 ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <span className={`text-sm font-medium ${
                  isDark ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  Earns "{catBadge}" Badge
                </span>
              </div>
            </div>
          )}

          {/* Action Button */}
          {unit.status !== 'locked' && (
            <button
              onClick={() => unit.status === 'completed' ? setShowQuiz(true) : onStart?.(unit.id)}
              className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${
                unit.status === 'completed'
                  ? isDark
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                  : isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {unit.status === 'completed' ? (
                <>
                  <FastForward className="w-4 h-4" />
                  <span>Take Quiz</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>{unit.progress.current > 0 ? 'Continue' : 'Start'}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Connecting Line */}
        {!isLast && (
          <div className={`absolute left-9 top-full w-0.5 h-8 ${
            isDark ? 'bg-gray-700' : 'bg-gray-300'
          }`} />
        )}
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          quiz={unit.quiz}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </>
  );
};