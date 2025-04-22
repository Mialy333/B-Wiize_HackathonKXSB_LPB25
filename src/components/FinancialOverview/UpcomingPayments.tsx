import React from 'react';
import { Calendar } from 'lucide-react';
import { CardProps } from './types';
import { useTheme } from '../../ThemeContext';

interface UpcomingPaymentsProps extends CardProps {
  payments?: { name: string; amount: number; due: string }[];
}

export const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({
  isLoading,
  error,
  onRetry,
  payments,
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-gray-900/50' : 'bg-white/50'
    } backdrop-blur-sm shadow-lg`}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            Upcoming
          </h3>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-16 ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'} rounded-lg`} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-500 mb-3">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-purple-600 hover:text-purple-800"
              >
                Try Again
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {payments?.map((payment) => (
              <div
                key={payment.name}
                className={`p-3 rounded-lg ${
                  isDark ? 'bg-gray-800/50' : 'bg-gray-50/80'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {payment.name}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Due {new Date(payment.due).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <span className={`font-medium ${
                    isDark ? 'text-red-400' : 'text-red-600'
                  }`}>
                    €{payment.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};