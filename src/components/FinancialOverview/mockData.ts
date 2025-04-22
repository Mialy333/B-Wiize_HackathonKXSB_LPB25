import { FinancialData } from './types';

export const mockFinancialData: FinancialData = {
  expenses: [
    // Get these from localStorage flowData
    { category: 'Rent', amount: 0 },
    { category: 'Food', amount: 0 },
    { category: 'Transport', amount: 0 },
    { category: 'Entertainment', amount: 0 },
  ],
  savings: {
    amount: 75,
    rate: 10,
  },
  defiWallet: {
    isConnected: false,
    xrp: 50,
    eurRate: 2.00,
    escrow: {
      amount: 30,
      condition: '3 challenges',
      fulfillment: 'secret123',
      status: 'Locked',
      challengesCompleted: 0,
      totalChallengesRequired: 3
    }
  },
  payments: [
    { name: 'Rent', amount: 150, due: '2025-02-28' },
    { name: 'Phone Bill', amount: 45, due: '2025-02-15' },
    { name: 'Internet', amount: 60, due: '2025-02-20' },
  ]
};