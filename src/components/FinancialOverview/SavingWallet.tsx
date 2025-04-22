import React, { useState } from 'react';
import { PiggyBank, Pencil, Check } from 'lucide-react';
import { CardProps, SavingsData } from './types';
import { useTheme } from '../../ThemeContext';

interface SavingWalletProps extends CardProps {
  savings?: SavingsData;
  onUpdateRate?: (newRate: number) => void;
}

export const SavingWallet: React.FC<SavingWalletProps> = ({
  isLoading,
  error,
  onRetry,
  savings,
  onUpdateRate,
}) => {
  const { isDark } = useTheme();
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [tempRate, setTempRate] = useState(savings?.rate || 10);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
    setTempRate(value);
  };

  const handleSaveRate = () => {
    onUpdateRate?.(tempRate);
    setIsEditingRate(false);
  };

  return (
    <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-gray-900/50' : 'bg-white/50'
    } backdrop-blur-sm shadow-lg`}>
      <div className="h-full p-4 flex flex-col">
        <div className="flex items-center mb-4">
          <PiggyBank className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            Savings
          </h3>
        </div>

        <div className="flex-1 grid gap-4">
          <div className={`p-4 rounded-xl ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50/80'
          }`}>
            <h4 className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Standard Savings
            </h4>
            <div className={`text-2xl font-medium mb-4 ${
              isDark ? 'text-gray-200' : 'text-gray-900'
            }`}>
              €{savings?.amount.toFixed(2)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Savings Rate
                </span>
                {isEditingRate ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={tempRate}
                      onChange={handleRateChange}
                      min="0"
                      max="100"
                      className={`w-16 px-2 py-1 rounded-lg text-sm ${
                        isDark
                          ? 'bg-gray-700 text-white border-gray-600'
                          : 'bg-white text-gray-900 border-gray-300'
                      } border focus:ring-2 focus:ring-purple-500`}
                    />
                    <button
                      onClick={handleSaveRate}
                      className={`p-1 rounded-lg transition-colors ${
                        isDark
                          ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-900'}>
                      {savings?.rate}%
                    </span>
                    <button
                      onClick={() => setIsEditingRate(true)}
                      className={`p-1 rounded-lg transition-colors ${
                        isDark
                          ? 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                          : 'bg-gray-200/50 text-gray-600 hover:bg-gray-300/50'
                      }`}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className={`h-1.5 rounded-full ${isDark ? 'bg-gray-700/50' : 'bg-gray-200/80'}`}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${isEditingRate ? tempRate : savings?.rate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Savings Goals */}
          <div className={`p-4 rounded-xl ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50/80'
          }`}>
            <h4 className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Monthly Goal Progress
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Emergency Fund
                  </span>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    €75/€500
                  </span>
                </div>
                <div className={`h-1.5 rounded-full ${isDark ? 'bg-gray-700/50' : 'bg-gray-200/80'}`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
                    style={{ width: '15%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Concert Fund
                  </span>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    €30/€100
                  </span>
                </div>
                <div className={`h-1.5 rounded-full ${isDark ? 'bg-gray-700/50' : 'bg-gray-200/80'}`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                    style={{ width: '30%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};