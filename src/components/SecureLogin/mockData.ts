export const mockMembershipCard = {
  tokenId: 'XRP-NFT-001',
  owner: 'rStudentAddress123',
  metadata: {
    encryptedInfo: 'aes256.encrypted.hash123',
    tier: 'Premium Student',
    validUntil: '2026-02-28',
    issuedOn: '2025-02-28'
  },
  status: 'minted' as const
};

export const mockWalletData = {
  isConnected: false,
  address: undefined,
  error: undefined
};