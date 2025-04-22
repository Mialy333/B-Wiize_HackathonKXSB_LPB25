import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, RefreshCcw, ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import { ChallengesProps, ChallengesData, DailyChallenge } from './types';
import { ChallengeCard } from './ChallengeCard';
import { mockChallengesData } from './mockData';
import { useTheme } from '../../ThemeContext';
import { DailyChallengeCard } from './DailyChallengeCard';

// Leaderboard component
const ChallengeLeaderboard = () => {
  const { isDark } = useTheme();
  
  // Mock leaderboard data
  const leaderboardData = [
    { id: 1, name: 'Jane D.', challenges: 15, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 2, name: 'Alex K.', challenges: 12, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 3, name: 'Sam T.', challenges: 10, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 4, name: 'Riley M.', challenges: 8, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 5, name: 'Jordan P.', challenges: 7, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100' }
  ];
  
  return (
    <div className={`mb-8 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg`}>
      <div className="flex items-center mb-6">
        <Trophy className={`w-6 h-6 text-teal-500`} />
        <h2 className={`text-lg font-semibold ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Top B-Wiize Challengers
        </h2>
      </div>
      
      <div className="space-y-3">
        {leaderboardData.map((user, index) => (
          <div 
            key={user.id} 
            className={`flex items-center p-3 rounded-lg ${
              index === 0 
                ? isDark ? 'bg-teal-500/20 border border-teal-500/30' : 'bg-teal-100' 
                : isDark ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
              index === 0 
                ? 'bg-teal-500 text-white' 
                : index === 1 
                  ? 'bg-gray-400 text-white' 
                  : index === 2 
                    ? 'bg-amber-700 text-white' 
                    : isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'
            } font-bold text-sm`}>
              {index + 1}
            </div>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full object-cover ml-3"
            />
            <div className="ml-3 flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user.name}
                </span>
                <span className={`font-medium ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                  {user.challenges} challenges
                </span>
              </div>
              <div className="flex items-center text-xs">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {index === 0 ? 'Challenge King' : index < 3 ? 'Young Striker' : 'Cub Hustler'}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Your Position */}
        <div className={`mt-4 p-3 rounded-lg border ${
          isDark ? 'bg-purple-900/20 border-purple-500/30' : 'bg-purple-50 border-purple-200'
        }`}>
          <div className="flex items-center">
            <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
              isDark ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
            } font-bold text-sm`}>
              6
            </div>
            <div className="ml-3 flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  You
                </span>
                <span className={`font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  5 challenges
                </span>
              </div>
              <div className="text-xs">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  Complete 2 more to reach top 5!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4 mb-2`} />
          <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2 mb-4`} />
          <div className="flex flex-wrap gap-4">
            <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-24`} />
            <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-24`} />
          </div>
        </div>
      ))}
    </div>
  );
};

const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="text-center py-8">
    <p className="text-red-500 mb-2">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center justify-center mx-auto text-purple-600 hover:text-purple-800 transition-colors"
      >
        <RefreshCcw className="w-4 h-4 mr-1" />
        Retry
      </button>
    )}
  </div>
);

export const Challenges: React.FC<ChallengesProps> = ({
  data: propData,
  isLoading: propIsLoading,
  error: propError,
  onRetry,
  onJoinChallenge,
  onCompleteDailyChallenge
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<ChallengesData | undefined>();
  const [dailyChallengeIndex, setDailyChallengeIndex] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const dailyChallengesRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const fetchData = useCallback(async () => {
    if (propData) {
      setData(propData);
      return;
    }

    setIsLoading(true);
    setError(undefined);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(mockChallengesData);
    } catch (err) {
      setError('Failed to load challenges');
    } finally {
      setIsLoading(false);
    }
  }, [propData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setActiveIndex(1);
    }
    if (touchEnd - touchStart > 75) {
      // Swipe right
      setActiveIndex(0);
    }
  };

  const handleDailyTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleDailyTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleDailyTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!data?.dailyChallenges) return;
    
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setDailyChallengeIndex(prev => 
        prev < data.dailyChallenges.length - 1 ? prev + 1 : prev
      );
    }
    if (touchEnd - touchStart > 75) {
      // Swipe right
      setDailyChallengeIndex(prev => prev > 0 ? prev - 1 : prev);
    }
  };

  const scrollDailyChallenge = (direction: 'prev' | 'next') => {
    if (!data?.dailyChallenges) return;
    
    if (direction === 'next') {
      setDailyChallengeIndex(prev => 
        prev < data.dailyChallenges.length - 1 ? prev + 1 : prev
      );
    } else {
      setDailyChallengeIndex(prev => prev > 0 ? prev - 1 : prev);
    }
  };

  const handleCompleteChallenge = (challengeId: string) => {
    if (!data?.dailyChallenges) return;
    
    const updatedChallenges = data.dailyChallenges.map(challenge => 
      challenge.id === challengeId ? { ...challenge, completed: true } : challenge
    );
    
    setData({
      ...data,
      dailyChallenges: updatedChallenges
    });
    
    // Update escrow progress if available
    if (onCompleteDailyChallenge) {
      onCompleteDailyChallenge(challengeId);
    }
  };

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  const currentIsLoading = propIsLoading ?? isLoading;
  const currentError = propError ?? error;

  const ChallengeList: React.FC<{
    title: string;
    type: 'current' | 'upcoming';
    challenges?: typeof mockChallengesData.current;
  }> = ({ title, type, challenges }) => (
    <div className={`${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg`}>
      <div className="flex items-center mb-6">
        <Trophy className={`w-6 h-6 ${type === 'current' ? 'text-green-600' : 'text-gray-500'}`} />
        <h2 className={`text-lg font-semibold ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
      </div>

      {currentIsLoading ? (
        <SkeletonLoader />
      ) : currentError ? (
        <ErrorState message={currentError} onRetry={onRetry} />
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 -mr-2">
          {challenges?.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              type={type}
              onJoin={onJoinChallenge}
            />
          ))}
        </div>
      )}
    </div>
  );

  const DailyChallengesSection = () => {
    if (!data?.dailyChallenges || data.dailyChallenges.length === 0) return null;
    
    const currentChallenge = data.dailyChallenges[dailyChallengeIndex];
    
    return (
      <div className={`mb-6 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <Calendar className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
            <h2 className={`text-lg font-semibold ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Daily Challenges
            </h2>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs ${
            isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'
          }`}>
            <Clock className="w-3 h-3 inline mr-1" />
            <span>Refreshes in 12:34:56</span>
          </div>
        </div>
        
        <div 
          ref={dailyChallengesRef}
          className="relative"
          onTouchStart={handleDailyTouchStart}
          onTouchMove={handleDailyTouchMove}
          onTouchEnd={handleDailyTouchEnd}
        >
          <DailyChallengeCard 
            challenge={currentChallenge}
            onComplete={handleCompleteChallenge}
          />
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => scrollDailyChallenge('prev')}
              disabled={dailyChallengeIndex === 0}
              className={`p-2 rounded-full transition-colors ${
                dailyChallengeIndex === 0
                  ? isDark ? 'text-gray-600' : 'text-gray-300'
                  : isDark
                  ? 'text-teal-400 hover:text-teal-300'
                  : 'text-teal-600 hover:text-teal-800'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {/* Dot Indicators */}
            <div className="flex space-x-2">
              {data.dailyChallenges.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setDailyChallengeIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    dailyChallengeIndex === index
                      ? isDark
                        ? 'bg-teal-500 w-4'
                        : 'bg-teal-600 w-4'
                      : isDark
                      ? 'bg-gray-600'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => scrollDailyChallenge('next')}
              disabled={dailyChallengeIndex === data.dailyChallenges.length - 1}
              className={`p-2 rounded-full transition-colors ${
                dailyChallengeIndex === data.dailyChallenges.length - 1
                  ? isDark ? 'text-gray-600' : 'text-gray-300'
                  : isDark
                  ? 'text-teal-400 hover:text-teal-300'
                  : 'text-teal-600 hover:text-teal-800'
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Daily Challenges Section */}
      <DailyChallengesSection />
      
      {/* Leaderboard Toggle (Mobile Only) */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleLeaderboard}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isDark
              ? 'bg-teal-600 hover:bg-teal-700 text-white'
              : 'bg-teal-500 hover:bg-teal-600 text-white'
          }`}
        >
          {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
        </button>
      </div>
      
      {/* Leaderboard Section */}
      {showLeaderboard && <ChallengeLeaderboard />}
      
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <ChallengeList
          title="Current Challenges"
          type="current"
          challenges={data?.current}
        />
        <ChallengeList
          title="Upcoming Challenges"
          type="upcoming"
          challenges={data?.upcoming}
        />
      </div>

      {/* Mobile View */}
      <div
        className="md:hidden space-y-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="transition-transform duration-300 ease-in-out">
          {activeIndex === 0 ? (
            <ChallengeList
              title="Current Challenges"
              type="current"
              challenges={data?.current}
            />
          ) : (
            <ChallengeList
              title="Upcoming Challenges"
              type="upcoming"
              challenges={data?.upcoming}
            />
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center px-4">
          <button
            onClick={() => setActiveIndex(0)}
            className={`p-2 rounded-full ${
              activeIndex === 0
                ? isDark ? 'text-gray-600' : 'text-gray-300'
                : isDark
                ? 'text-purple-400 hover:text-purple-300'
                : 'text-purple-600 hover:text-purple-800'
            }`}
            disabled={activeIndex === 0}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          {/* Dot Indicators */}
          <div className="flex space-x-2">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeIndex === index
                    ? isDark ? 'bg-purple-400' : 'bg-purple-600'
                    : isDark ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex(1)}
            className={`p-2 rounded-full ${
              activeIndex === 1
                ? isDark ? 'text-gray-600' : 'text-gray-300'
                : isDark
                ? 'text-purple-400 hover:text-purple-300'
                : 'text-purple-600 hover:text-purple-800'
            }`}
            disabled={activeIndex === 1}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};