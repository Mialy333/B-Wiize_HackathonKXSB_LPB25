import { DivideIcon as LucideIcon } from 'lucide-react';

export interface MembershipCard {
  tokenId: string;
  owner: string;
  metadata: {
    encryptedInfo: string;
    tier: string;
    validUntil: string;
    issuedOn: string;
  };
  status: 'minting' | 'minted' | 'error';
}

export interface SecureLoginProps {
  onLogin: (tokenId: string) => void;
  isLoading?: boolean;
  error?: string;
}

export interface WalletState {
  isConnected: boolean;
  address?: string;
  error?: string;
}