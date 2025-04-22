import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { 
  Wallet, 
  Trophy, 
  Star, 
  TrendingUp, 
  Coffee,
  Train,
  Music,
  Plus,
  Gift,
  Bell,
  ExternalLink
} from 'lucide-react';

// Types
interface SpendingEntry {
  amount: number;
  category: 'Food' | 'Transport' | 'Fun';
  timestamp: string;
}

interface BalanceState {
  vibeCap: number;
  spentToday: number;
  wzc: number;
  streak: number;
  badges: string[];
  rank: number;
  deficit: number;
  entries: SpendingEntry[];
  isPremium: boolean;
  lastLogDate?: string;
}

interface Nudge {
  id: string;
  text: string;
  reward: number;
  amount: number;
}

const CATEGORIES = {
  Food: { icon: Coffee, color: 'text-orange-500' },
  Transport: { icon: Train, color: 'text-blue-500' },
  Fun: { icon: Music, color: 'text-purple-500' }
};

const INITIAL_STATE: BalanceState = {
  vibeCap: 20,
  spentToday: 0,
  wzc: 0,
  streak: 0,
  badges: [],
  rank: 8,
  deficit: -330,
  entries: [],
  isPremium: false
};

const MOCK_LEADERBOARD = [
  { name: 'Sophie M.', wzc: 450, university: 'Sorbonne' },
  { name: 'Lucas P.', wzc: 380, university: 'Sciences Po' },
  { name: 'Emma D.', wzc: 350, university: 'Sorbonne' },
  { name: 'Thomas B.', wzc: 320, university: 'ESSEC' },
  { name: 'Julie L.', wzc: 300, university: 'HEC Paris' },
  { name: 'Antoine R.', wzc: 280, university: 'Dauphine' },
  { name: 'Marie C.', wzc: 260, university: 'Sciences Po' },
  { name: 'Mona A.', wzc: 240, university: 'Sorbonne' },
  { name: 'Hugo S.', wzc: 220, university: 'ESCP' },
  { name: 'Léa B.', wzc: 200, university: 'HEC Paris' }
];

const MOCK_NUDGES: Nudge[] = [
  { id: 'coffee', text: 'Skip your coffee', reward: 10, amount: 3 },
  { id: 'lunch', text: 'Pack lunch today', reward: 15, amount: 8 },
  { id: 'metro', text: 'Walk instead of metro', reward: 8, amount: 2 }
];

export const Balance: React.FC = () => {
  const [state, setState] = useState<BalanceState>(INITIAL_STATE);
  const [newAmount, setNewAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Food' | 'Transport' | 'Fun'>('Food');
  const [activeNudge, setActiveNudge] = useState<Nudge | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [section, setSection] = useState<'main' | 'leaderboard'>('main');

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => setSection('leaderboard'),
    onSwipedRight: () => setSection('main')
  });

  // Check and update streak
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (state.lastLogDate && state.lastLogDate !== today) {
      setState(prev => ({
        ...prev,
        streak: prev.streak + 1,
        lastLogDate: today
      }));
    }
  }, [state.lastLogDate]);

  // Show random nudge every 30 minutes
  useEffect(() => {
    const showRandomNudge = () => {
      const randomNudge = MOCK_NUDGES[Math.floor(Math.random() * MOCK_NUDGES.length)];
      setActiveNudge(randomNudge);
      setTimeout(() => setActiveNudge(null), 10000); // Hide after 10 seconds
    };

    const interval = setInterval(showRandomNudge, 1800000); // 30 minutes
    return () => clearInterval(interval);
  }, []);

  const handleAddSpending = () => {
    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount <= 0) return;

    const today = new Date().toISOString().split('T')[0];
    const entry: SpendingEntry = {
      amount,
      category: selectedCategory,
      timestamp: new Date().toISOString()
    };

    setState(prev => {
      const newSpentToday = prev.spentToday + amount;
      const baseWzc = amount; // 1 WZC per €1
      const bonusWzc = newSpentToday <= prev.vibeCap ? 5 : 0; // 5 WZC bonus if under cap
      const premiumBonus = prev.isPremium ? 10 : 0; // 10 WZC/day bonus for premium

      return {
        ...prev,
        spentToday: newSpentToday,
        wzc: prev.wzc + baseWzc + bonusWzc + premiumBonus,
        entries: [...prev.entries, entry],
        lastLogDate: today
      };
    });

    setNewAmount('');
  };

  const handleNudgeComplete = (nudge: Nudge) => {
    setState(prev => ({
      ...prev,
      wzc: prev.wzc + nudge.reward,
      deficit: prev.deficit + nudge.amount
    }));
    setActiveNudge(null);
  };

  const handleStartDemo = () => {
    setState({
      ...INITIAL_STATE,
      spentToday: 4,
      wzc: 9,
      streak: 1,
      entries: [{
        amount: 4,
        category: 'Food',
        timestamp: new Date().toISOString()
      }],
      lastLogDate: new Date().toISOString().split('T')[0]
    });
  };

  const calculateVibePercentage = () => {
    return Math.max(0, Math.min(100, ((state.vibeCap - state.spentToday) / state.vibeCap) * 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-gray-900 text-white p-4">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-6 text-center">
        <h1 className="text-xl font-bold text-teal-500">
          B-Wiize: Powering Gen Z to Money Mastery
        </h1>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="md:flex md:space-x-4">
          {/* Main Section */}
          <div className={`flex-1 space-y-4 ${section === 'leaderboard' ? 'hidden md:block' : ''}`}>
            {/* Vibe Cap Card */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Daily Vibe Cap</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={state.vibeCap}
                    onChange={(e) => setState(prev => ({ ...prev, vibeCap: parseFloat(e.target.value) || 0 }))}
                    className="w-20 px-2 py-1 rounded bg-gray-700 border border-teal-500 text-white"
                  />
                  <span>€/day</span>
                </div>
              </div>

              {/* Vibe Bar */}
              <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-2">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${calculateVibePercentage()}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>€{state.spentToday} spent</span>
                <span>€{Math.max(0, state.vibeCap - state.spentToday)} left</span>
              </div>
            </div>

            {/* Spending Log */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="font-semibold mb-4">Add Spending</h2>
              <div className="flex space-x-2 mb-4">
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="Amount in €"
                  className="flex-1 px-3 py-2 rounded bg-gray-700 border border-teal-500 text-white placeholder-gray-400"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as 'Food' | 'Transport' | 'Fun')}
                  className="px-3 py-2 rounded bg-gray-700 border border-teal-500 text-white"
                >
                  {Object.keys(CATEGORIES).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button
                  onClick={handleAddSpending}
                  className="px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Recent Entries */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {state.entries.map((entry, index) => {
                  const CategoryIcon = CATEGORIES[entry.category].icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-700">
                      <div className="flex items-center">
                        <CategoryIcon className={`w-5 h-5 mr-2 ${CATEGORIES[entry.category].color}`} />
                        <span>€{entry.amount}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-semibold">Your Stats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>{state.streak}-day streak</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-gray-700">
                  <div className="text-sm text-gray-400">WiizeCoin</div>
                  <div className="text-xl font-bold text-teal-500">{state.wzc} WZC</div>
                </div>
                <div className="p-3 rounded bg-gray-700">
                  <div className="text-sm text-gray-400">Monthly Deficit</div>
                  <div className="text-xl font-bold text-red-500">€{Math.abs(state.deficit)}</div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="font-semibold mb-4">Badges</h2>
              <div className="flex space-x-4">
                {state.badges.map((badge, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                      <Trophy className="w-6 h-6 text-purple-500" />
                    </div>
                    <span className="text-sm">{badge}</span>
                  </div>
                ))}
                {state.badges.length === 0 && (
                  <div className="text-gray-400 text-sm">
                    Complete challenges to earn badges!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className={`md:w-80 space-y-4 ${section === 'main' ? 'hidden md:block' : ''}`}>
            {/* Leaderboard Card */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Campus Leaderboard</h2>
                <TrendingUp className="w-5 h-5 text-teal-500" />
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {MOCK_LEADERBOARD.map((user, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${
                      user.name === 'Mona A.'
                        ? 'bg-purple-500/20 border border-purple-500/50'
                        : 'bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.university}</div>
                      </div>
                      <div className="text-teal-500 font-medium">{user.wzc} WZC</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards Card */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="font-semibold mb-4">Rewards</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="w-full p-3 rounded bg-gray-700 hover:bg-gray-600 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Premium Tier</div>
                      <div className="text-sm text-gray-400">€2.99/month</div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                </button>
                <button className="w-full p-3 rounded bg-gray-700 hover:bg-gray-600 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Café Voucher</div>
                      <div className="text-sm text-gray-400">500 WZC = €5</div>
                    </div>
                    <Coffee className="w-5 h-5 text-teal-500" />
                  </div>
                </button>
                <button className="w-full p-3 rounded bg-gray-700 hover:bg-gray-600 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">XRPL Transfer</div>
                      <div className="text-sm text-gray-400">1,000 WZC = 0.01 XRP</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-teal-500" />
                  </div>
                </button>
              </div>
            </div>

            {/* Ad Banner (Free Tier) */}
            {!state.isPremium && (
              <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
                <div className="text-sm text-gray-400">Sponsored</div>
                <div className="font-medium mt-1">Save 20% at Café Madeleine</div>
                <button className="mt-2 px-4 py-1 rounded bg-teal-500 hover:bg-teal-600 text-sm">
                  Learn More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center space-x-2 md:hidden">
        <button
          onClick={() => setSection('main')}
          className={`w-2 h-2 rounded-full transition-all ${
            section === 'main'
              ? 'bg-teal-500 w-4'
              : 'bg-gray-500'
          }`}
        />
        <button
          onClick={() => setSection('leaderboard')}
          className={`w-2 h-2 rounded-full transition-all ${
            section === 'leaderboard'
              ? 'bg-teal-500 w-4'
              : 'bg-gray-500'
          }`}
        />
      </div>

      {/* Nudge Popup */}
      {activeNudge && (
        <div className="fixed bottom-4 right-4 max-w-xs bg-teal-500 p-4 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center justify-between mb-2">
            <Bell className="w-5 h-5" />
            <button onClick={() => setActiveNudge(null)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="mb-2">{activeNudge.text} to earn {activeNudge.reward} WZC!</p>
          <button
            onClick={() => handleNudgeComplete(activeNudge)}
            className="w-full py-2 rounded bg-white text-teal-500 font-medium"
          >
            Accept Challenge
          </button>
        </div>
      )}

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Upgrade to Premium</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span>10 bonus WZC daily</span>
              </li>
              <li className="flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                <span>Exclusive badges</span>
              </li>
              <li className="flex items-center">
                <Wallet className="w-5 h-5 text-yellow-500 mr-2" />
                <span>XRPL integration</span>
              </li>
              <li className="flex items-center">
                <Gift className="w-5 h-5 text-yellow-500 mr-2" />
                <span>Ad-free experience</span>
              </li>
            </ul>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="flex-1 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  setState(prev => ({ ...prev, isPremium: true }));
                  setShowPremiumModal(false);
                }}
                className="flex-1 py-2 rounded bg-teal-500 hover:bg-teal-600"
              >
                Upgrade €2.99/mo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Button */}
      <button
        onClick={handleStartDemo}
        className="fixed bottom-4 left-4 px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
      >
        Start Demo
      </button>
    </div>
  );
};