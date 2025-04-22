export interface Challenge {
  id: string;
  title: string;
  date: string;
  reward: {
    xp: number;
    badge?: string;
  };
  participants: number;
  description: string;
  backgroundImage: string;
  progress?: {
    current: number;
    total: number;
  };
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
}

export interface ChallengesData {
  current: Challenge[];
  upcoming: Challenge[];
  dailyChallenges: DailyChallenge[];
}

export interface ChallengesProps {
  data?: ChallengesData;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  onJoinChallenge?: (challengeId: string) => void;
  onCompleteDailyChallenge?: (challengeId: string) => void;
}