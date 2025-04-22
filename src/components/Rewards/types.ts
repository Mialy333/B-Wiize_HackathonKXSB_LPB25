import { DivideIcon as LucideIcon } from 'lucide-react';

export type BadgeCategory = 'Challenges' | 'Education' | 'News' | 'DeFi' | 'Community';
export type BadgeStage = 'baby' | 'teenage' | 'adult';
export type BadgeStatus = 'Earned' | 'In Progress' | 'Locked';

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: BadgeCategory;
  animal: string;
  stage: BadgeStage;
  status: BadgeStatus;
  progress?: number;
  total?: number;
  tokenId: string;
  color: string;
}

export interface RewardsData {
  badges: Badge[];
  totalEarned: number;
  totalAvailable: number;
}

export interface RewardsProps {
  data?: RewardsData;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  onViewOnLedger?: (tokenId: string) => void;
  onCollectNFT?: (badgeId: string) => void;
}

export interface BadgeCardProps {
  badge: Badge;
  onViewOnLedger?: (tokenId: string) => void;
  onCollect?: (badgeId: string) => void;
}

export interface AnimalIconProps {
  animal: string;
  stage: BadgeStage;
  className?: string;
}