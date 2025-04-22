import { RewardsData } from './types';

export const mockRewardsData: RewardsData = {
  badges: [
    // Challenges - Tiger
    {
      id: '001',
      title: 'Cub Hustler',
      description: 'Completed 1 challenge',
      category: 'Challenges',
      animal: 'tiger',
      stage: 'baby',
      status: 'Earned',
      progress: 1,
      total: 1,
      tokenId: 'XRP-BDG-001',
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: '002',
      title: 'Young Striker',
      description: 'Completed 5 challenges',
      category: 'Challenges',
      animal: 'tiger',
      stage: 'teenage',
      status: 'In Progress',
      progress: 3,
      total: 5,
      tokenId: 'XRP-BDG-002',
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: '003',
      title: 'Challenge King',
      description: 'Completed 10 challenges',
      category: 'Challenges',
      animal: 'tiger',
      stage: 'adult',
      status: 'Locked',
      progress: 0,
      total: 10,
      tokenId: 'XRP-BDG-003',
      color: 'from-orange-500 to-amber-600'
    },

    // Education - Cat
    {
      id: '004',
      title: 'Kitten Learner',
      description: 'Completed 1 education unit',
      category: 'Education',
      animal: 'cat',
      stage: 'baby',
      status: 'Earned',
      progress: 1,
      total: 1,
      tokenId: 'XRP-BDG-004',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: '005',
      title: 'Curious Feline',
      description: 'Completed 4 education units',
      category: 'Education',
      animal: 'cat',
      stage: 'teenage',
      status: 'In Progress',
      progress: 2,
      total: 4,
      tokenId: 'XRP-BDG-005',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: '006',
      title: 'Wise Whiskers',
      description: 'Completed 7 education units',
      category: 'Education',
      animal: 'cat',
      stage: 'adult',
      status: 'Locked',
      progress: 0,
      total: 7,
      tokenId: 'XRP-BDG-006',
      color: 'from-purple-500 to-purple-700'
    },

    // News - Panther
    {
      id: '007',
      title: 'Cub Reader',
      description: 'Read 3 financial articles',
      category: 'News',
      animal: 'panther',
      stage: 'baby',
      status: 'Earned',
      progress: 3,
      total: 3,
      tokenId: 'XRP-BDG-007',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: '008',
      title: 'Prowling Scout',
      description: 'Read 10 financial articles',
      category: 'News',
      animal: 'panther',
      stage: 'teenage',
      status: 'In Progress',
      progress: 6,
      total: 10,
      tokenId: 'XRP-BDG-008',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: '009',
      title: 'News Stalker',
      description: 'Read 20 financial articles',
      category: 'News',
      animal: 'panther',
      stage: 'adult',
      status: 'Locked',
      progress: 0,
      total: 20,
      tokenId: 'XRP-BDG-009',
      color: 'from-blue-500 to-indigo-600'
    },

    // DeFi - Lynx
    {
      id: '010',
      title: 'Lynx Cub',
      description: 'Saved 10 XRP',
      category: 'DeFi',
      animal: 'lynx',
      stage: 'baby',
      status: 'Earned',
      progress: 10,
      total: 10,
      tokenId: 'XRP-BDG-010',
      color: 'from-teal-500 to-emerald-600'
    },
    {
      id: '011',
      title: 'Swift Sprinter',
      description: 'Saved 50 XRP',
      category: 'DeFi',
      animal: 'lynx',
      stage: 'teenage',
      status: 'In Progress',
      progress: 35,
      total: 50,
      tokenId: 'XRP-BDG-011',
      color: 'from-teal-500 to-emerald-600'
    },
    {
      id: '012',
      title: 'Crypto Lynx',
      description: 'Saved 100 XRP',
      category: 'DeFi',
      animal: 'lynx',
      stage: 'adult',
      status: 'Locked',
      progress: 0,
      total: 100,
      tokenId: 'XRP-BDG-012',
      color: 'from-teal-500 to-emerald-600'
    },

    // Community - Lion
    {
      id: '013',
      title: 'Lion Cub',
      description: 'Made 10 community interactions',
      category: 'Community',
      animal: 'lion',
      stage: 'baby',
      status: 'Earned',
      progress: 10,
      total: 10,
      tokenId: 'XRP-BDG-013',
      color: 'from-red-500 to-rose-600'
    },
    {
      id: '014',
      title: 'Pride Teen',
      description: 'Made 50 community interactions',
      category: 'Community',
      animal: 'lion',
      stage: 'teenage',
      status: 'In Progress',
      progress: 28,
      total: 50,
      tokenId: 'XRP-BDG-014',
      color: 'from-red-500 to-rose-600'
    },
    {
      id: '015',
      title: 'Lion Leader',
      description: 'Made 100 community interactions',
      category: 'Community',
      animal: 'lion',
      stage: 'adult',
      status: 'Locked',
      progress: 0,
      total: 100,
      tokenId: 'XRP-BDG-015',
      color: 'from-red-500 to-rose-600'
    }
  ],
  totalEarned: 5,
  totalAvailable: 15
};