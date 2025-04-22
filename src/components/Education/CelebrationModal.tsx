import React, { useState, useEffect } from 'react';
import { Trophy, Star, Cat, GraduationCap, Gift } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { CatIcon } from '../CatIcon';

interface CelebrationModalProps {
  onClose: () => void;
  badgeType: 'kitten' | 'curious' | 'wise';
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ onClose, badgeType }) => {
  const { isDark } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    // Trigger animations sequentially
    setShowConfetti(true);
    const timer = setTimeout(() => setShowReward(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getBadgeInfo = () => {
    switch (badgeType) {
      case 'kitten':
        return {
          title: 'Kitten Learner',
          description: 'You\'ve completed your first financial education unit!',
          xp: 100,
          tokenId: 'XRP-BDG-004'
        };
      case 'curious':
        return {
          title: 'Curious Feline',
          description: 'You\'ve completed 5 financial education units!',
          xp: 200,
          tokenId: 'XRP-BDG-005'
        };
      case 'wise':
        return {
          title: 'Wise Whiskers',
          description: 'You\'ve completed 10 financial education units and earned your certification!',
          xp: 500,
          tokenId: 'XRP-BDG-006'
        };
      default:
        return {
          title: 'Financial Achievement',
          description: 'You\'ve reached a financial education milestone!',
          xp: 100,
          tokenId: 'XRP-BDG-000'
        };
    }
  };

  const badgeInfo = getBadgeInfo();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`relative max-w-lg w-full rounded-2xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-xl overflow-hidden`}>
        {/* Animated confetti background */}
        <div className="absolute inset-0 overflow-hidden">
          {showConfetti && (
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full ${
                    ['bg-purple-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500'][
                      i % 5
                    ]
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `confetti ${1 + Math.random() * 2}s ease-out forwards`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Trophy Animation */}
          <div className={`transform transition-all duration-1000 ${
            showReward ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}>
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-6">
                <CatIcon className="w-12 h-12 text-white" />
              </div>
            </div>

            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Congratulations!
            </h3>
            
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              You've earned the "{badgeInfo.title}" Badge!
            </p>

            {/* Special Rewards */}
            <div className={`p-6 rounded-xl mb-6 ${
              isDark ? 'bg-purple-900/30' : 'bg-purple-50'
            }`}>
              <h4 className={`font-semibold mb-4 ${
                isDark ? 'text-purple-300' : 'text-purple-900'
              }`}>
                Special Rewards Unlocked
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {badgeInfo.xp} XP Bonus
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <Cat className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {badgeInfo.title} Badge
                  </div>
                </div>
              </div>
            </div>

            {/* NFT Token ID */}
            <div className={`p-4 rounded-xl mb-6 ${
              isDark ? 'bg-blue-900/30' : 'bg-blue-50'
            }`}>
              <Gift className={`w-6 h-6 mx-auto mb-2 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                NFT Badge Minted: {badgeInfo.tokenId}
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-blue-300/70' : 'text-blue-700/70'}`}>
                Your achievement is now permanently recorded on the XRP Ledger
              </p>
            </div>

            <button
              onClick={onClose}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};