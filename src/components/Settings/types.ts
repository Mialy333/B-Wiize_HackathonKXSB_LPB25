export interface Benefit {
  title: string;
  description: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  avatar: string;
  joinedDate: string;
  badges: string[];
}

export interface MembershipCard {
  tokenId: string;
  owner: string;
  metadata: {
    tier: string;
    validUntil: string;
    issuedOn: string;
  };
}

export interface SettingsData {
  profile: StudentProfile;
  membershipCard: MembershipCard;
  benefits: Benefit[];
}

export interface SettingsProps {
  data?: SettingsData;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  onUpdateProfile?: (profile: Partial<StudentProfile>) => void;
  onUpdatePassword?: (oldPassword: string, newPassword: string) => void;
  onClose?: () => void;
}