export interface Expense {
  category: string;
  amount: number;
}

export interface Payment {
  name: string;
  amount: number;
  due: string;
}

export interface SavingsData {
  amount: number;
  rate: number;
}

export interface DefiWalletData {
  isConnected: boolean;
  address?: string;
  xrp: number;
  eurRate: number;
  escrow?: {
    amount: number;
    condition: string;
    fulfillment: string;
    status: 'Locked' | 'Ready' | 'Released';
    challengesCompleted: number;
    totalChallengesRequired: number;
  };
}

export interface FinancialData {
  expenses: Expense[];
  savings: SavingsData;
  defiWallet: DefiWalletData;
  payments: Payment[];
}

export interface CardProps {
  isLoading: boolean;
  error?: string;
  onRetry?: () => void;
}

export interface DefiWalletProps extends CardProps {
  defiWallet?: DefiWalletData;
  onConnect?: () => void;
  isConnected?: boolean;
}