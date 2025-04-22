import { DivideIcon as LucideIcon } from 'lucide-react';

export type UnitStatus = 'completed' | 'in-progress' | 'locked';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  reward: {
    xp: number;
    badge?: string;
  };
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  likes: number;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  status: UnitStatus;
  icon: LucideIcon;
  progress: {
    current: number;
    total: number;
  };
  content: {
    podcast: string;
    text: string;
    playbackSpeed: number;
    video?: string;
    infographic?: string;
  };
  quiz: Quiz;
  votes: {
    up: number;
    down: number;
  };
  comments: Comment[];
  xp: number;
}

export interface ModuleGroup {
  id: string;
  title: string;
  description: string;
  units: Unit[];
  unlockRequirement?: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
}

export interface EducationData {
  moduleGroups: {
    intro: ModuleGroup;
    core: ModuleGroup;
    advanced: ModuleGroup;
  };
  totalProgress: {
    completed: number;
    total: number;
  };
  userProgress: {
    xp: number;
    streak: number;
    lastCompleted?: string;
  };
  leaderboard: LeaderboardUser[];
  dailyChallenges: DailyChallenge[];
}

export interface EducationProps {
  data?: EducationData;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  onUnitComplete?: (unitId: number) => void;
  onQuizComplete?: (unitId: number, score: number) => void;
  onVote?: (unitId: number, voteType: 'up' | 'down') => void;
  onFeedback?: (unitId: number, feedback: 'happy' | 'neutral' | 'sad') => void;
  onChallengeComplete?: (challengeId: string) => void;
}