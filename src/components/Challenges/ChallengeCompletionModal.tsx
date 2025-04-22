import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle, Star, SettingsIcon as Confetti, PartyPopper } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

interface ChallengeCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  escrowAmount?: number;
}

export const ChallengeCompletionModal: React.FC<ChallengeCompletionModalProps> = ({
  isOpen,
  onClose,
  escrowAmount = 30
}) => {
  const { isDark } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showEscrow, setShowEscrow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animations sequentially
      setShowConfetti(true);
      const rewardTimer = setTimeout(() => setShowReward(true), 600);
      const escrowTimer = setTimeout(() => setShowEscrow(true), 1200);
      
      return () => {
        clearTimeout(rewardTimer);
        clearTimeout(escrowTimer);
      };
    } else {
      setShowConfetti(false);
      setShowReward(false);
      setShowEscrow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className={`relative max-w-md w-full rounded-2xl ${
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
                    ['bg-purple-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-teal-500'][
                      i % 6
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
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Congratulations!
            </h3>
            
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              You've completed 100% of your challenges!
            </p>

            {/* Escrow Unlocked Message */}
            <div className={`p-6 rounded-xl mb-6 transform transition-all duration-1000 ${
              showEscrow 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            } ${
              isDark ? 'bg-purple-900/30' : 'bg-purple-50'
            }`}>
              <h4 className={`font-semibold mb-4 ${
                isDark ? 'text-purple-300' : 'text-purple-900'
              }`}>
                Escrow Unlocked!
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    3/3 Challenges
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {escrowAmount} XRP Reward
                  </div>
                </div>
              </div>
              <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Your escrow is now ready to be released! Go to your DeFi Wallet to claim your XRP.
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
              Claim Your Reward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};