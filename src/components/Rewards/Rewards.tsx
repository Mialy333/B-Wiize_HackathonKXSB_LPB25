import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, RefreshCcw, Award, Filter } from 'lucide-react';
import { RewardsProps, RewardsData, BadgeCategory } from './types';
import { BadgeCard } from './BadgeCard';
import { mockRewardsData } from './mockData';
import { useTheme } from '../../ThemeContext';

const categories: BadgeCategory[] = ['Challenges', 'Education', 'News', 'DeFi', 'Community'];

const SkeletonBadge = () => {
  const { isDark } = useTheme();
  return (
    <div className={`rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6 animate-pulse border-2 ${
      isDark ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`w-24 h-24 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className={`h-4 w-24 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className={`h-3 w-32 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className={`h-2 w-16 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
      </div>
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

export const Rewards: React.FC<RewardsProps> = ({
  data: propData,
  isLoading: propIsLoading,
  error: propError,
  onRetry,
  onViewOnLedger,
  onCollectNFT,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(propError);
  const [data, setData] = useState<RewardsData | undefined>();
  const [activeCategory, setActiveCategory] = useState<BadgeCategory | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'earned' | 'in-progress' | 'locked'>('all');
  const [mintingBadgeId, setMintingBadgeId] = useState<string | null>(null);
  const { isDark } = useTheme();

  const fetchData = useCallback(async () => {
    if (propData) {
      setData(propData);
      return;
    }

    setIsLoading(true);
    setError(undefined);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(mockRewardsData);
    } catch (err) {
      setError('Failed to load rewards');
    } finally {
      setIsLoading(false);
    }
  }, [propData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleViewOnLedger = (tokenId: string) => {
    console.log(`Viewing token ${tokenId} on XRP Ledger...`);
    onViewOnLedger?.(tokenId);
    // In a real app, this would open the XRPL explorer with the token ID
    window.open(`https://xrpl.org/nft/${tokenId}`, '_blank');
  };

  const handleCollectNFT = async (badgeId: string) => {
    setMintingBadgeId(badgeId);
    try {
      // Simulate minting delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update badge status to 'Earned'
      if (data) {
        const updatedBadges = data.badges.map(badge => 
          badge.id === badgeId 
            ? { ...badge, status: 'Earned' as const } 
            : badge
        );
        
        setData({
          ...data,
          badges: updatedBadges,
          totalEarned: data.totalEarned + 1
        });
      }
      
      // Call the parent handler if provided
      onCollectNFT?.(badgeId);
      
      /* 
      In a real implementation with XRPL, this would:
      1. Connect to XRPL using xrpl.js
      2. Prepare NFTokenMint transaction
      3. Sign with user's wallet
      4. Submit to the ledger
      5. Wait for validation
      6. Update UI with the new token ID
      
      Example code (commented out):
      
      const wallet = xrpl.Wallet.fromSeed(seed)
      const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
      await client.connect()
      
      const transactionBlob = {
        TransactionType: "NFTokenMint",
        Account: wallet.classicAddress,
        URI: xrpl.convertStringToHex(JSON.stringify({
          title: badge.title,
          category: badge.category,
          stage: badge.stage,
          animal: badge.animal
        })),
        Flags: 8,
        TransferFee: 0,
        NFTokenTaxon: 0
      }
      
      const tx = await client.submitAndWait(transactionBlob, { wallet })
      const nfts = await client.request({
        command: "account_nfts",
        account: wallet.classicAddress
      })
      
      // Get the newly minted NFT ID
      const newTokenID = nfts.result.account_nfts[nfts.result.account_nfts.length - 1].NFTokenID
      
      await client.disconnect()
      */
      
    } catch (err) {
      setError('Failed to mint NFT badge');
    } finally {
      setMintingBadgeId(null);
    }
  };

  // Filter badges by category and status
  const getFilteredBadges = () => {
    if (!data) return [];
    
    let filteredBadges = data.badges;
    
    // Filter by category if active
    if (activeCategory) {
      filteredBadges = filteredBadges.filter(badge => badge.category === activeCategory);
    }
    
    // Filter by status if not 'all'
    if (filterStatus !== 'all') {
      filteredBadges = filteredBadges.filter(badge => {
        if (filterStatus === 'earned') return badge.status === 'Earned';
        if (filterStatus === 'in-progress') return badge.status === 'In Progress';
        if (filterStatus === 'locked') return badge.status === 'Locked';
        return true;
      });
    }
    
    return filteredBadges;
  };

  // Group badges by category
  const getBadgesByCategory = () => {
    const filteredBadges = getFilteredBadges();
    const grouped: Record<BadgeCategory, typeof filteredBadges> = {
      Challenges: [],
      Education: [],
      News: [],
      DeFi: [],
      Community: []
    };
    
    filteredBadges.forEach(badge => {
      grouped[badge.category].push(badge);
    });
    
    return grouped;
  };

  const currentIsLoading = propIsLoading ?? isLoading;
  const currentError = propError ?? error;
  const badgesByCategory = getBadgesByCategory();
  const filteredBadges = getFilteredBadges();

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className={`mb-8 p-6 rounded-xl ${
        isDark ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-sm shadow-lg`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Achievement Badges
            </h2>
            <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Collect badges as you master financial skills
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-4 py-2 rounded-lg ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex items-center">
                <Trophy className={`w-5 h-5 mr-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {data?.totalEarned}/{data?.totalAvailable} Earned
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Filter */}
        <div className={`p-4 rounded-xl ${
          isDark ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center mb-3">
            <Award className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Categories
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                activeCategory === null
                  ? isDark
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-900'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activeCategory === category
                    ? isDark
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-900'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className={`p-4 rounded-xl ${
          isDark ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center mb-3">
            <Filter className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Status
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filterStatus === 'all'
                  ? isDark
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-900'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('earned')}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filterStatus === 'earned'
                  ? isDark
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-900'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Earned
            </button>
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filterStatus === 'in-progress'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-900'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterStatus('locked')}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filterStatus === 'locked'
                  ? isDark
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-300 text-gray-900'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Locked
            </button>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      {currentIsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <SkeletonBadge key={i} />
          ))}
        </div>
      ) : currentError ? (
        <ErrorState message={currentError} onRetry={onRetry} />
      ) : filteredBadges.length === 0 ? (
        <div className={`p-12 text-center rounded-xl ${
          isDark ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-sm shadow-lg`}>
          <Trophy className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No badges found
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Try adjusting your filters to see more badges
          </p>
        </div>
      ) : activeCategory ? (
        // Single category view
        <div className="space-y-6">
          <h3 className={`text-lg font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {activeCategory} Badges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={mintingBadgeId === badge.id ? {...badge, status: 'Earned'} : badge}
                onViewOnLedger={handleViewOnLedger}
                onCollect={handleCollectNFT}
              />
            ))}
          </div>
        </div>
      ) : (
        // All categories view with sections
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryBadges = badgesByCategory[category];
            if (!categoryBadges.length) return null;

            return (
              <div key={category} className="space-y-6">
                <h3 className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {category} Badges
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {categoryBadges.map((badge) => (
                    <BadgeCard
                      key={badge.id}
                      badge={mintingBadgeId === badge.id ? {...badge, status: 'Earned'} : badge}
                      onViewOnLedger={handleViewOnLedger}
                      onCollect={handleCollectNFT}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};