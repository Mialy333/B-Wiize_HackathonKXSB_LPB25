import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DollarSign, PieChart, Calendar, ArrowLeft, ArrowRight, QrCode, Link, X, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FinancialData, CardProps } from './types';
import { mockFinancialData } from './mockData';
import { useTheme } from '../../ThemeContext';
import { SavingWallet } from './SavingWallet';
import { ExpensesByCategories } from './ExpensesByCategories';
import { DefiWallet } from './DefiWallet';
import { UpcomingPayments } from './UpcomingPayments';

interface FinancialOverviewProps {
  escrowProgress?: number;
  onEditSetup: () => void;
}

const AvailableBalance: React.FC<CardProps & { balance: number }> = ({ 
  isLoading, 
  error, 
  onRetry,
  balance
}) => {
  const { isDark } = useTheme();
  
  return (
    <div className="px-2 py-2">
      <div className="text-center">
        <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Available Balance
        </p>
        {isLoading ? (
          <div className="animate-pulse">
            <div className={`h-8 ${isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'} rounded-lg w-48 mx-auto`} />
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-500 mb-3">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        ) : (
          <div className="relative inline-block">
            {balance > 0 && (
              <>
                <div className="firework">
                  <div className="spark" />
                  <div className="spark" />
                  <div className="spark" />
                </div>
                <div className="firework">
                  <div className="spark" />
                  <div className="spark" />
                  <div className="spark" />
                </div>
                <div className="firework">
                  <div className="spark" />
                  <div className="spark" />
                  <div className="spark" />
                </div>
                <div className="firework">
                  <div className="spark" />
                  <div className="spark" />
                  <div className="spark" />
                </div>
              </>
            )}
            <div className={`text-3xl font-bold tracking-tight text-shadow transition-all duration-300 ${
              balance > 0 
                ? isDark ? 'text-green-400' : 'text-green-600'
                : isDark ? 'text-white' : 'text-gray-900'
            }`}>
              €{Math.round(balance)}
            </div>
            <div className={`absolute -inset-4 blur-xl rounded-full -z-10 transition-opacity duration-300 ${
              balance > 0 
                ? 'bg-green-400/20' 
                : 'bg-gray-400/10'
            }`} />
          </div>
        )}
      </div>
    </div>
  );
};

export const FinancialOverview: React.FC<FinancialOverviewProps> = ({ escrowProgress = 0, onEditSetup }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<FinancialData | undefined>();
  const [showQRModal, setShowQRModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [savingsRate, setSavingsRate] = useState(10);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const fetchData = useCallback(async () => {
    if (data) return;

    setIsLoading(true);
    setError(undefined);
    try {
      // Get flow data from localStorage
      const flowData = localStorage.getItem('flowData');
      if (flowData) {
        const { currentBalance } = JSON.parse(flowData);
        setCurrentBalance(currentBalance);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(mockFinancialData);
    } catch (err) {
      setError('Failed to load financial data');
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data && escrowProgress > 0) {
      const updatedBadges = data.badges.map(badge => 
        badge.id === escrowProgress 
          ? { ...badge, status: 'Earned' as const } 
          : badge
      );
      
      setData({
        ...data,
        badges: updatedBadges,
        totalEarned: data.totalEarned + 1
      });
    }
  }, [escrowProgress]);

  const handleConnectWallet = () => {
    setShowQRModal(true);
    setIsConnecting(true);
    
    // Simulate wallet connection after 3 seconds
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setShowQRModal(false);
      
      // Update wallet data
      if (data) {
        setData({
          ...data,
          defiWallet: {
            ...data.defiWallet,
            isConnected: true,
            xrp: 50,
            usdRate: 0.50
          }
        });
      }
    }, 3000);
  };

  const handleUpdateSavingsRate = (newRate: number) => {
    setSavingsRate(newRate);
    if (data) {
      setData({
        ...data,
        savings: {
          ...data.savings,
          rate: newRate
        }
      });
    }
  };

  // Handle touch events for mobile swiping
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - next card
      if (activeIndex < 3) {
        scrollToCard(activeIndex + 1);
      }
    }
    if (touchEnd - touchStart > 75) {
      // Swipe right - previous card
      if (activeIndex > 0) {
        scrollToCard(activeIndex - 1);
      }
    }
  };

  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = carousel.offsetWidth;
    carousel.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const handleEditSetup = () => {
    onEditSetup();
    navigate('/setup');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2">
      <div className="mb-4">
        <AvailableBalance
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          balance={currentBalance}
        />
      </div>
      
      {/* Desktop View - 2x2 Grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-3 aspect-[2/1]">
        <div className="aspect-square">
          <ExpensesByCategories
            isLoading={isLoading}
            error={error}
            onRetry={fetchData}
            expenses={data?.expenses}
          />
        </div>
        <div className="aspect-square">
          <SavingWallet
            isLoading={isLoading}
            error={error}
            onRetry={fetchData}
            savings={data?.savings}
            onUpdateRate={handleUpdateSavingsRate}
          />
        </div>
        <div className="aspect-square">
          <DefiWallet
            isLoading={isLoading}
            error={error}
            onRetry={fetchData}
            defiWallet={data?.defiWallet}
            onConnect={handleConnectWallet}
            isConnected={isConnected}
          />
        </div>
        <div className="aspect-square">
          <UpcomingPayments
            isLoading={isLoading}
            error={error}
            onRetry={fetchData}
            payments={data?.payments}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col justify-between">
        {/* Carousel */}
        <div
          ref={carouselRef}
          className="carousel-container flex overflow-x-auto snap-x snap-mandatory touch-pan-x touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-item w-full flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
            <ExpensesByCategories
              isLoading={isLoading}
              error={error}
              onRetry={fetchData}
              expenses={data?.expenses}
            />
          </div>
          <div className="carousel-item w-full flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
            <SavingWallet
              isLoading={isLoading}
              error={error}
              onRetry={fetchData}
              savings={data?.savings}
              onUpdateRate={handleUpdateSavingsRate}
            />
          </div>
          <div className="carousel-item w-full flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
            <DefiWallet
              isLoading={isLoading}
              error={error}
              onRetry={fetchData}
              defiWallet={data?.defiWallet}
              onConnect={handleConnectWallet}
              isConnected={isConnected}
            />
          </div>
          <div className="carousel-item w-full flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
            <UpcomingPayments
              isLoading={isLoading}
              error={error}
              onRetry={fetchData}
              payments={data?.payments}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center p-4">
          {/* Dot Indicators */}
          <div className="flex items-center space-x-2">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
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
        </div>
      </div>

      {/* Setup Flow Button */}
      <button
        onClick={handleEditSetup}
        className={`fixed bottom-20 left-4 p-3 rounded-full shadow-lg transition-colors ${
          isDark
            ? 'bg-gray-800 text-teal-400 hover:bg-gray-700'
            : 'bg-white text-teal-600 hover:bg-gray-100'
        }`}
      >
        <Pencil className="w-5 h-5" />
      </button>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-sm w-full rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } p-6 relative`}>
            {/* Close Button */}
            <button
              onClick={() => {
                setShowQRModal(false);
                setIsConnecting(false);
              }}
              className={`absolute top-4 right-4 p-2 rounded-full ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Connect Xaman Wallet
              </h3>
              
              {isConnecting ? (
                <div className="space-y-4">
                  <div className="relative w-48 h-48 mx-auto">
                    <div className={`absolute inset-0 rounded-xl ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    } animate-pulse`} />
                    <QrCode className={`w-full h-full p-8 ${
                      isDark ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Scan with Xaman Wallet to connect...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Link className={`w-16 h-16 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Ready to connect your Xaman wallet?
                  </p>
                  <button
                    onClick={handleConnectWallet}
                    className={`w-full py-3 px-4 rounded-xl font-medium ${
                      isDark
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-purple-500 hover:bg-purple-600 text-white'
                    }`}
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};