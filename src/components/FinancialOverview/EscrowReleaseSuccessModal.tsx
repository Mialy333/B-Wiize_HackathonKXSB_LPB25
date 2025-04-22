import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle, Star, Award } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

interface EscrowReleaseSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export const EscrowReleaseSuccessModal: React.FC<EscrowReleaseSuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  amount 
}) => {
  const { isDark } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Trigger animations sequentially
      setShowConfetti(true);
      const rewardTimer = setTimeout(() => setShowReward(true), 600);
      const detailsTimer = setTimeout(() => setShowDetails(true), 1200);
      
      return () => {
        clearTimeout(rewardTimer);
        clearTimeout(detailsTimer);
      };
    } else {
      setShowConfetti(false);
      setShowReward(false);
      setShowDetails(false);
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
              <div className="absolute inset-0 bg-teal-400 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-teal-400 to-teal-600 rounded-full p-6">
                <DollarSign className="w-12 h-12 text-white" />
              </div>
            </div>

            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Escrow Released!
            </h3>
            
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {amount} XRP has been successfully released to your wallet.
            </p>

            {/* Transaction Details */}
            <div className={`p-6 rounded-xl mb-6 transform transition-all duration-1000 ${
              showDetails 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            } ${
              isDark ? 'bg-teal-900/30' : 'bg-teal-50'
            }`}>
              <h4 className={`font-semibold mb-4 ${
                isDark ? 'text-teal-300' : 'text-teal-900'
              }`}>
                Transaction Complete
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Verified
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    +50 XP Earned
                  </div>
                </div>
              </div>
              <div className={`mt-4 p-3 rounded-lg ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}>
                <p className={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Transaction ID: <span className="text-teal-400">xrpl-tx-{Math.random().toString(36).substring(2, 10)}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-teal-500 hover:bg-teal-600 text-white'
              }`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};