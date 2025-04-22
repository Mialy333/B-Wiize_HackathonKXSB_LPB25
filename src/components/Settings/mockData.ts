import { SettingsData } from './types';

export const mockSettingsData: SettingsData = {
  profile: {
    id: 'STU123456',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    birthdate: '2003-05-15',
    level: 12,
    xp: 1250,
    nextLevelXp: 1500,
    avatar: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=150&h=150',
    joinedDate: '2024-09-15',
    badges: ['Savings Master', 'Budget Pro', 'Investment Novice']
  },
  membershipCard: {
    tokenId: 'XRP-NFT-001',
    owner: 'rStudentAddress123',
    metadata: {
      tier: 'Premium Student',
      validUntil: '2026-02-28',
      issuedOn: '2025-02-28'
    }
  },
  benefits: [
    {
      title: 'Wise Student Tier',
      description: 'Access to premium financial education content and personalized budgeting tools'
    },
    {
      title: 'Savings Star',
      description: 'Achieved by maintaining consistent savings goals for 3 consecutive months'
    },
    {
      title: '50 XRP Saved',
      description: 'Successfully saved 50 XRP in your student savings wallet'
    },
    {
      title: '100 Community XP',
      description: 'Earned through active participation in the BudgetWise community'
    }
  ]
};