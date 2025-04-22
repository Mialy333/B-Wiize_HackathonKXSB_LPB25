import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Sun, Moon, ThumbsUp, ThumbsDown, Trophy, Cat, Link, Wallet, DollarSign, Flame, Hash, ChevronDown, ChevronUp, Bell } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../ThemeContext';

// Types
interface BudgetCategory {
  name: string;
  amount: number;
  color: string;
}

interface Budget {
  inflows: {
    allowance: number;
    sideHustles: number;
    gifts: number;
    total: number;
  };
  outflows: {
    food: number;
    entertainment: number;
    shopping: number;
    total: number;
  };
  upcoming: {
    rent: number;
    subscriptions: number;
    other: number;
    total: number;
  };
  lastUpdated: string;
}

interface Tip {
  id: string;
  title: string;
  desc: string;
  votes: {
    up: number;
    down: number;
  };
}

interface Challenge {
  id: string;
  title: string;
  desc: string;
  xp: number;
  wzc: number;
  completed: boolean;
}

interface Badge {
  id: string;
  name: string;
  xpRequired: number;
  wzc: number;
  earned: boolean;
}

interface HomeState {
  budget: Budget;
  education: Tip[];
  challenges: Challenge[];
  xp: number;
  wzc: number;
  badges: Badge[];
  walletConnected: boolean;
  showBudgetDetails: boolean;
  needsUpdate: boolean;
  activeBudgetSection: 'inflows' | 'outflows' | 'upcoming' | null;
}

// Mock data
const initialState: HomeState = {
  budget: {
    inflows: {
      allowance: 200,
      sideHustles: 50,
      gifts: 20,
      total: 270
    },
    outflows: {
      food: 80,
      entertainment: 30,
      shopping: 20,
      total: 130
    },
    upcoming: {
      rent: 100,
      subscriptions: 15,
      other: 20,
      total: 135
    },
    lastUpdated: new Date().toISOString()
  },
  education: [
    {
      id: '1',
      title: 'Skip the $5 Coffee',
      desc: "Brew at home and save $5/day. That\"s $150/month for concert tix! 🎵",
      votes: { up: 10, down: 2 }
    },
    {
      id: '2',
      title: '#ThriftFlip: Vintage Finds',
      desc: 'Hit thrift stores early weekends for designer drops at 90% off! 👕',
      votes: { up: 15, down: 1 }
    },
    {
      id: '3',
      title: '#SideHustle: Digital Art',
      desc: 'Turn your iPad doodles into passive income on print-on-demand! 🎨',
      votes: { up: 8, down: 3 }
    },
    {
      id: '4',
      title: '#FoodHack: Meal Prep',
      desc: 'Sunday prep = $3 lunches all week vs $15 takeout! 🥗',
      votes: { up: 12, down: 2 }
    },
    {
      id: '5',
      title: '#StudentDeals: Apps',
      desc: 'Stack student discounts with cashback apps for double savings! 📱',
      votes: { up: 9, down: 1 }
    }
  ],
  challenges: [
    {
      id: '1',
      title: 'Thrift a Dope Fit',
      desc: 'Complete outfit under $20',
      xp: 10,
      wzc: 5,
      completed: false
    },
    {
      id: '2',
      title: 'Gig It Up',
      desc: 'Earn $15 side hustle',
      xp: 15,
      wzc: 10,
      completed: false
    },
    {
      id: '3',
      title: 'Concert Cash',
      desc: 'Save $20 for shows',
      xp: 20,
      wzc: 15,
      completed: false
    }
  ],
  xp: 0,
  wzc: 0,
  badges: [
    {
      id: '1',
      name: 'Cash Newbie',
      xpRequired: 50,
      wzc: 1,
      earned: false
    },
    {
      id: '2',
      name: 'Money Maverick',
      xpRequired: 150,
      wzc: 2,
      earned: false
    },
    {
      id: '3',
      name: 'Vibe Boss',
      xpRequired: 300,
      wzc: 3,
      earned: false
    }
  ],
  walletConnected: false,
  showBudgetDetails: false,
  needsUpdate: false,
  activeBudgetSection: null
};

// Pie chart colors
const COLORS = {
  inflows: ['#9333ea', '#a855f7', '#c084fc'],
  outflows: ['#14b8a6', '#2dd4bf', '#5eead4'],
  upcoming: ['#8b5cf6', '#a78bfa', '#c4b5fd']
};

// Tabs
type Tab = 'vibe' | 'education' | 'challenges' | 'rewards';

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('vibe');
  const [state, setState] = useState<HomeState>(initialState);
  const { isDark, toggleTheme } = useTheme();

  // Weekly update reminder
  useEffect(() => {
    const checkUpdateNeeded = () => {
      const lastUpdate = new Date(state.budget.lastUpdated);
      const now = new Date();
      const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
      setState(prev => ({ ...prev, needsUpdate: daysSinceUpdate >= 7 }));
    };

    const interval = setInterval(checkUpdateNeeded, 1000 * 60 * 60); // Check every hour
    checkUpdateNeeded(); // Initial check

    return () => clearInterval(interval);
  }, [state.budget.lastUpdated]);

  // Calculate Vibe Budget
  const calculateVibeBudget = () => {
    return state.budget.inflows.total - (state.budget.outflows.total + state.budget.upcoming.total);
  };

  // Prepare pie chart data
  const getPieData = (section: 'inflows' | 'outflows' | 'upcoming'): BudgetCategory[] => {
    switch (section) {
      case 'inflows':
        return [
          { name: 'Allowance', amount: state.budget.inflows.allowance, color: COLORS.inflows[0] },
          { name: 'Side Hustles', amount: state.budget.inflows.sideHustles, color: COLORS.inflows[1] },
          { name: 'Gifts', amount: state.budget.inflows.gifts, color: COLORS.inflows[2] }
        ];
      case 'outflows':
        return [
          { name: 'Food', amount: state.budget.outflows.food, color: COLORS.outflows[0] },
          { name: 'Entertainment', amount: state.budget.outflows.entertainment, color: COLORS.outflows[1] },
          { name: 'Shopping', amount: state.budget.outflows.shopping, color: COLORS.outflows[2] }
        ];
      case 'upcoming':
        return [
          { name: 'Rent', amount: state.budget.upcoming.rent, color: COLORS.upcoming[0] },
          { name: 'Subscriptions', amount: state.budget.upcoming.subscriptions, color: COLORS.upcoming[1] },
          { name: 'Other', amount: state.budget.upcoming.other, color: COLORS.upcoming[2] }
        ];
    }
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const tabs: Tab[] = ['vibe', 'education', 'challenges', 'rewards'];
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      const tabs: Tab[] = ['vibe', 'education', 'challenges', 'rewards'];
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1]);
      }
    }
  });

  // Vote handler
  const handleVote = (tipId: string, voteType: 'up' | 'down') => {
    setState(prev => ({
      ...prev,
      education: prev.education.map(tip => 
        tip.id === tipId
          ? { ...tip, votes: { ...tip.votes, [voteType]: tip.votes[voteType] + 1 } }
          : tip
      )
    }));
  };

  // Challenge completion handler with budget update prompt
  const handleCompleteChallenge = (challengeId: string) => {
    setState(prev => {
      const challenge = prev.challenges.find(c => c.id === challengeId);
      if (!challenge || challenge.completed) return prev;

      const newXp = prev.xp + challenge.xp;
      const newWzc = prev.wzc + challenge.wzc;
      const newBadges = prev.badges.map(badge => ({
        ...badge,
        earned: badge.earned || newXp >= badge.xpRequired
      }));

      // Update budget based on challenge
      let newBudget = { ...prev.budget };
      if (challenge.title === 'Gig It Up') {
        newBudget.inflows = {
          ...newBudget.inflows,
          sideHustles: newBudget.inflows.sideHustles + 15,
          total: newBudget.inflows.total + 15
        };
      } else if (challenge.title === 'Thrift a Dope Fit') {
        newBudget.outflows = {
          ...newBudget.outflows,
          shopping: newBudget.outflows.shopping + 20,
          total: newBudget.outflows.total + 20
        };
      }

      return {
        ...prev,
        xp: newXp,
        wzc: newWzc,
        badges: newBadges,
        budget: newBudget,
        challenges: prev.challenges.map(c =>
          c.id === challengeId ? { ...c, completed: true } : c
        )
      };
    });
  };

  // Budget update handler
  const handleBudgetUpdate = (
    section: 'inflows' | 'outflows' | 'upcoming',
    category: string,
    value: number
  ) => {
    setState(prev => {
      const newBudget = { ...prev.budget };
      const sectionData = { ...newBudget[section] };
      
      // Update category amount
      sectionData[category as keyof typeof sectionData] = value;
      
      // Recalculate total
      sectionData.total = Object.entries(sectionData)
        .reduce((sum, [key, val]) => key !== 'total' ? sum + val : sum, 0);
      
      newBudget[section] = sectionData;
      newBudget.lastUpdated = new Date().toISOString();

      return {
        ...prev,
        budget: newBudget,
        needsUpdate: false
      };
    });
  };

  // Wallet connection handler
  const handleConnectWallet = () => {
    setState(prev => ({
      ...prev,
      walletConnected: true
    }));
    /* 
    In production, this would use XUMM SDK:
    const xumm = new Xumm('api-key');
    const request = await xumm.authorize();
    // QR code or deep link handling
    */
  };

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-br from-purple-900 via-gray-900 to-black' 
        : 'bg-gradient-to-br from-purple-500 via-white to-purple-50'
    } transition-colors duration-300`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-yellow-500 hover:text-yellow-600 transition-colors"
      >
        {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Header */}
      <header className="sticky top-0 w-full p-6 text-center bg-gradient-to-b from-black/20 to-transparent backdrop-blur-sm z-10">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
          B-Wiize
        </h1>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mb-6 px-4">
        <div className={`inline-flex rounded-lg p-1 ${
          isDark ? 'bg-gray-800/50' : 'bg-white/50'
        } backdrop-blur-sm`}>
          {(['vibe', 'education', 'challenges', 'rewards'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? isDark
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-500 text-white'
                  : isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div {...handlers} className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Vibe Check (Financial Overview) */}
          {activeTab === 'vibe' && (
            <div className={`p-6 rounded-2xl ${
              isDark ? 'bg-gray-800/90' : 'bg-white/90'
            } backdrop-blur-sm shadow-lg relative overflow-hidden ${
              state.needsUpdate ? 'animate-pulse' : ''
            }`}>
              {/* Iridescent Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-teal-400/20 opacity-50 animate-shimmer" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Vibe Budget
                  </h2>
                  {state.needsUpdate && (
                    <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                      isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      <Bell className="w-4 h-4 mr-2" />
                      Update your flow, fam!
                    </div>
                  )}
                </div>

                {/* Vibe Budget Display */}
                <div className="mb-6 text-center">
                  <div className={`text-3xl font-bold ${
                    isDark ? 'text-teal-400' : 'text-teal-600'
                  }`}>
                    ${calculateVibeBudget()}
                  </div>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Available to Vibe
                  </p>
                </div>

                {/* Budget Sections */}
                <div className="space-y-4">
                  {/* Inflows Section */}
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <button
                      onClick={() => setState(prev => ({
                        ...prev,
                        activeBudgetSection: prev.activeBudgetSection === 'inflows' ? null : 'inflows'
                      }))}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <DollarSign className={`w-5 h-5 mr-2 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Inflows
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                          ${state.budget.inflows.total}
                        </span>
                        {state.activeBudgetSection === 'inflows' ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>

                    {state.activeBudgetSection === 'inflows' && (
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Allowance
                              </label>
                              <input
                                type="number"
                                value={state.budget.inflows.allowance}
                                onChange={(e) => handleBudgetUpdate('inflows', 'allowance', Number(e.target.value))}
                                className={`w-full px-3 py-1.5 rounded-lg ${
                                  isDark
                                    ? 'bg-gray-600 text-white border-gray-500'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border focus:ring-2 focus:ring-purple-500`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Side Hustles
                              </label>
                              <input
                                type="number"
                                value={state.budget.inflows.sideHustles}
                                onChange={(e) => handleBudgetUpdate('inflows', 'sideHustles', Number(e.target.value))}
                                className={`w-full px-3 py-1.5 rounded-lg ${
                                  isDark
                                    ? 'bg-gray-600 text-white border-gray-500'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border focus:ring-2 focus:ring-purple-500`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Gifts
                              </label>
                              <input
                                type="number"
                                value={state.budget.inflows.gifts}
                                onChange={(e) => handleBudgetUpdate('inflows', 'gifts', Number(e.target.value))}
                                className={`w-full px-3 py-1.5 rounded-lg ${
                                  isDark
                                    ? 'bg-gray-600 text-white border-gray-500'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border focus:ring-2 focus:ring-purple-500`}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-32 h-32">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={getPieData('inflows')}
                                    dataKey="amount"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={25}
                                    outerRadius={40}
                                  >
                                    {getPieData('inflows').map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Outflows Section */}
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <button
                      onClick={() => setState(prev => ({
                        ...prev,
                        activeBudgetSection: prev.activeBudgetSection === 'outflows' ? null : 'outflows'
                      }))}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <DollarSign className={`w-5 h-5 mr-2 ${
                          isDark ? 'text-teal-400' : 'text-teal-600'
                        }`} />
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Outflows
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-2 ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                          ${state.budget.outflows.total}
                        </span>
                        {state.activeBudgetSection === 'outflows' ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>

                    {state.activeBudgetSection === 'outflows' && (
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Food & Drinks
                              </label>
                              <input
                                type="number"
                                value={state.budget.outflows.food}
                                onChange={(e) => handleBudgetUpdate('outflows', 'food', Number(e.target.value))}
                                className={`w-full px-3 py-1.5 rounded-lg ${
                                  isDark
                                    ? 'bg-gray-600 text-white border-gray-500'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border focus:ring-2 focus:ring-teal-500`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Entertainment
                              </label>
                              <input
                                type="number"
                                value={state.budget.outflows.entertainment}
                                onChange={(e) => handleBudgetUpdate('outflows', 'entertainment', Number(e.target.value))}
                                className={`w-full px-3 py-1.5 rounded-lg ${
                                  isDark
                                    ? 'bg-gray-600 text-white border-gray-500'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border focus:ring-2 focus:ring-teal-500`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Shopping
                              </label>
                              <input
                                type="number"
                                value={state.budget.outflows.shopping}
                                onChange={(e) => handleBudgetUpdate('outflows', 'shopping', Number(e.target.value))}
                                className={`w-full px-3 py-1.5 rounded-lg ${
                                  isDark
                                    ? 'bg-gray-600 text-white border-gray-500'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border focus:ring-2 focus:ring-teal-500`}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-32 h-32">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={getPieData('outflows')}
                                    dataKey="amount"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={25}
                                    outerRadius={40}
                                  >
                                    {getPieData('outflows').map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upcoming Section */}
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <button
                      onClick={() => setState(prev => ({
                        ...prev,
                        activeBudgetSection: prev.activeBudgetSection === 'upcoming' ? null : 'upcoming'
                      }))}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <DollarSign className={`w-5 h-5 mr-2 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Upcoming
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                          ${state.budget.upcoming.total}
                        </span>
                        {state.activeBudgetSection === 'upcoming' ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>

                    {state.activeBudgetSection === 'upcoming' && (
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Rent/Utilities
                              </label>
                              <input
                                type="number"
                                value={state.budget.upcoming.rent}
                                onChange={(e) => handleBudgetUpdate('upcoming', 'rent', Number(e.target.value))}
                                className={`w-full px-3 py-1.5 rounded-lg ${
                                  isDark
                                    ? 'bg-gray-600 text-white border-gray-500'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border focus:ring-2 focus:ring-purple-500`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Subscriptions
                              </label>
                              <input
                                type="number"
                                value={state.budget.upcoming.subscriptions}
                                onChange={(e) => handleBudgetUpdate('upcoming', 'subscriptions', Number(e.target.value))}
                                className={`w-full px-3 py-1.5 rounded-lg ${
                                  isDark
                                    ? 'bg-gray-600 text-white border-gray-500'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border focus:ring-2 focus:ring-purple-500`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Other
                              </label>
                              <input
                                type="number"
                                value={state.budget.upcoming.other}
                                onChange={(e) => handleBudgetUpdate('upcoming', 'other', Number(e.target.value))}
                                className={`w-full px-3 py-1.5 rounded-lg ${
                                  isDark
                                    ? 'bg-gray-600 text-white border-gray-500'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border focus:ring-2 focus:ring-purple-500`}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-32 h-32">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={getPieData('upcoming')}
                                    dataKey="amount"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={25}
                                    outerRadius={40}
                                  >
                                    {getPieData('upcoming').map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* WZC Balance */}
                {state.walletConnected ? (
                  <div className={`mt-4 p-4 rounded-lg ${
                    isDark ? 'bg-teal-900/20' : 'bg-teal-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                        WiizeCoin Balance
                      </span>
                      <span className="text-lg font-bold text-teal-500">
                        {state.wzc} WZC
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleConnectWallet}
                    className={`w-full mt-4 py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                      isDark
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'bg-teal-500 hover:bg-teal-600 text-white'
                    } transition-colors`}
                  >
                    <Link className="w-5 h-5" />
                    <span>Connect Testnet Wallet</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Education (#FinTok Tips) */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              {state.education.map((tip) => (
                <div
                  key={tip.id}
                  className={`p-6 rounded-2xl ${
                    isDark ? 'bg-gray-800/90' : 'bg-white/90'
                  } backdrop-blur-sm shadow-lg`}
                >
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    {tip.title}
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {tip.desc}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleVote(tip.id, 'up')}
                      className={`flex items-center space-x-1 ${
                        isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{tip.votes.up}</span>
                    </button>
                    <button
                      onClick={() => handleVote(tip.id, 'down')}
                      className={`flex items-center space-x-1 ${
                        isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{tip.votes.down}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Challenges */}
          {activeTab === 'challenges' && (
            <div className="space-y-4">
              {state.challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`p-6 rounded-2xl ${
                    isDark ? 'bg-gray-800/90' : 'bg-white/90'
                  } backdrop-blur-sm shadow-lg relative overflow-hidden group`}
                >
                  {/* Iridescent Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-teal-400/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {challenge.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          isDark ? 'text-teal-400' : 'text-teal-600'
                        }`}>
                          +{challenge.xp} XP
                        </span>
                        <span className={`text-sm font-medium ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                          +{challenge.wzc} WZC
                        </span>
                      </div>
                    </div>
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {challenge.desc}
                    </p>
                    <button
                      onClick={() => handleCompleteChallenge(challenge.id)}
                      disabled={challenge.completed}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        challenge.completed
                          ? isDark
                            ? 'bg-green-600 text-white cursor-not-allowed'
                            : 'bg-green-500 text-white cursor-not-allowed'
                          : isDark
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-purple-500 hover:bg-purple-600 text-white'
                      }`}
                    >
                      {challenge.completed ? 'Completed! 🎉' : 'Complete Challenge'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rewards */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl ${
                isDark ? 'bg-gray-800/90' : 'bg-white/90'
              } backdrop-blur-sm shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Your Progress
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className={`text-lg font-bold ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {state.xp} XP
                    </span>
                    {state.walletConnected && (
                      <span className={`text-lg font-bold ${
                        isDark ? 'text-teal-400' : 'text-teal-600'
                      }`}>
                        {state.wzc} WZC
                      </span>
                    )}
                  </div>
                </div>
                <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                    style={{
                      width: `${Math.min((state.xp / 300) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {state.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-6 rounded-2xl ${
                      isDark ? 'bg-gray-800/90' : 'bg-white/90'
                    } backdrop-blur-sm shadow-lg relative overflow-hidden group ${
                      badge.earned ? 'animate-bounce' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 mb-4 ${
                        badge.earned
                          ? isDark ? 'text-purple-400' : 'text-purple-600'
                          : isDark ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        <Cat className="w-full h-full" />
                      </div>
                      <h4 className={`font-semibold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {badge.name}
                      </h4>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {badge.earned ? 'Earned!' : `${state.xp}/${badge.xpRequired} XP`}
                      </p>
                      <div className={`text-sm font-medium ${
                        badge.earned
                          ? isDark ? 'text-teal-400' : 'text-teal-600'
                          : isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {badge.wzc} WZC
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};