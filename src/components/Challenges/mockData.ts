import { ChallengesData } from './types';

export const mockChallengesData: ChallengesData = {
  current: [
    {
      id: '1',
      title: 'Score VIP Concert Tickets',
      date: '2025-03-15',
      reward: {
        xp: 50,
        badge: 'Cub Hustler'
      },
      participants: 125,
      description: 'Budget $50 for a concert ticket via side hustle earnings.',
      backgroundImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800&h=400',
      progress: { current: 30, total: 50 }
    },
    {
      id: '2',
      title: 'Master the Museum Hack',
      date: '2025-03-20',
      reward: {
        xp: 75,
        badge: 'Cub Hustler'
      },
      participants: 98,
      description: 'Visit a museum for under $10 using student discounts.',
      backgroundImage: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=800&h=400',
      progress: { current: 0, total: 10 }
    },
    {
      id: '3',
      title: 'Influencer Foodie Challenge',
      date: '2025-03-10',
      reward: {
        xp: 60,
        badge: 'Cub Hustler'
      },
      participants: 156,
      description: 'Cook a TikTok influencer\'s recipe for under $15.',
      backgroundImage: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=800&h=400',
      progress: { current: 8, total: 15 }
    }
  ],
  upcoming: [
    {
      id: '4',
      title: 'Festival Fund Starter',
      date: '2025-04-05',
      reward: {
        xp: 75,
        badge: 'Young Striker'
      },
      participants: 89,
      description: 'Save $20 for a festival pass using FIRE tips.',
      backgroundImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800&h=400',
      progress: { current: 0, total: 20 }
    },
    {
      id: '5',
      title: 'Shop Smart Like a Pro',
      date: '2025-04-20',
      reward: {
        xp: 100,
        badge: 'Young Striker'
      },
      participants: 67,
      description: 'Score a $30 outfit from a thrift store or resale app.',
      backgroundImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800&h=400',
      progress: { current: 0, total: 30 }
    },
    {
      id: '6',
      title: 'Cultural Explorer',
      date: '2025-04-25',
      reward: {
        xp: 80,
        badge: 'Challenge King'
      },
      participants: 45,
      description: 'Plan a $25 day trip to a cultural event or landmark.',
      backgroundImage: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&q=80&w=800&h=400',
      progress: { current: 0, total: 25 }
    }
  ],
  dailyChallenges: [
    {
      id: 'dc1',
      title: 'Track Your Spending',
      description: 'Record every expense you make today, no matter how small.',
      xp: 20,
      completed: false
    },
    {
      id: 'dc2',
      title: 'No-Spend Challenge',
      description: 'Go the entire day without making any non-essential purchases.',
      xp: 30,
      completed: false
    },
    {
      id: 'dc3',
      title: 'Subscription Audit',
      description: 'Review all your subscriptions and cancel any you don\'t use regularly.',
      xp: 25,
      completed: true
    }
  ]
};