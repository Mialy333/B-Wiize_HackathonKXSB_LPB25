import React from 'react';
import { Coins, Link, Link2Off as LinkOff } from 'lucide-react';
import { DefiWalletProps } from './types';
import { useTheme } from '../../ThemeContext';

export const DefiWallet: React.FC<DefiWalletProps> = ({
  isLoading,
  error,
  onRetry,
  defiWallet,
  onConnect,
  isConnected
}) => {
  const { isDark } = useTheme();

  // Current XRP/EUR rate as of now (we would fetch this from an API in production)
  const xrpInEur = Math.round((defiWallet?.xrp || 0) * 2); // Current rate 2 EUR per XRP

  return (
    <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-gray-900/50' : 'bg-white/50'
    } backdrop-blur-sm shadow-lg`}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Coins className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            DeFi Wallet
          </h3>
        </div>

        <div className={`p-3 rounded-xl ${
          isDark ? 'bg-gray-800/50' : 'bg-gray-50/80'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              XRP Balance
            </h4>
            <button
              onClick={onConnect}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isConnected
                  ? isDark
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-blue-100 text-blue-700'
                  : isDark
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  : 'bg-gray-200/80 text-gray-700 hover:bg-gray-300/80'
              }`}
            >
              {isConnected ? (
                <>
                  <LinkOff className="w-3 h-3 mr-1.5" />
                  Disconnect
                </>
              ) : (
                <>
                  <Link className="w-3 h-3 mr-1.5" />
                  Connect
                </>
              )}
            </button>
          </div>

          {isConnected ? (
            <div className="space-y-2">
              <div className={`text-2xl font-medium ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {Math.round(defiWallet?.xrp || 0)} XRP
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  EUR Value
                </span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-900'}>
                  €{xrpInEur}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Coins className={`w-4 h-4 mr-1.5 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Rate: €2.00/XRP
                </span>
              </div>
            </div>
          ) : (
            <div className={`text-center py-6 text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Connect your XRP wallet to view balance
            </div>
          )}
        </div>
      </div>
    </div>
  );
};