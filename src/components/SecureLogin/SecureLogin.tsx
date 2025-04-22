import React, { useState, useCallback } from 'react';
import { Shield, Link, QrCode, Key, Mail, ExternalLink, Sun, Moon } from 'lucide-react';
import { SecureLoginProps, WalletState, MembershipCard } from './types';
import { mockMembershipCard, mockWalletData } from './mockData';
import { useTheme } from '../../ThemeContext';
import { CatIcon } from '../CatIcon';

export const SecureLogin: React.FC<SecureLoginProps> = ({ onLogin, isLoading, error: propError }) => {
  const { isDark, toggleTheme } = useTheme();
  const [walletState, setWalletState] = useState<WalletState>(mockWalletData);
  const [membershipCard, setMembershipCard] = useState<MembershipCard | null>(null);
  const [email, setEmail] = useState('');
  const [isMining, setIsMining] = useState(false);
  const [error, setError] = useState<string | undefined>(propError);

  const handleConnectWallet = useCallback(async () => {
    try {
      setError(undefined);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setWalletState({
        isConnected: true,
        address: 'rStudentAddress123'
      });
    } catch (err) {
      setError('Failed to connect wallet');
      setWalletState({ ...mockWalletData, error: 'Connection failed' });
    }
  }, []);

  const handleMineCard = useCallback(async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setIsMining(true);
      setError(undefined);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMembershipCard(mockMembershipCard);
      onLogin(mockMembershipCard.tokenId);
    } catch (err) {
      setError('Failed to mint membership card');
    } finally {
      setIsMining(false);
    }
  }, [email, onLogin]);

  const handleViewOnXRPL = useCallback(() => {
    window.open(`https://testnet.xrpl.org/nft/${membershipCard?.tokenId}`, '_blank');
  }, [membershipCard]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full transition-colors ${
          isDark
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
            : 'bg-white/80 text-gray-800 hover:bg-gray-100'
        } backdrop-blur-sm z-50`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-purple-900 via-gray-900 to-black'
            : 'bg-gradient-to-br from-purple-500 via-white to-purple-50'
        }`} />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute w-[800px] h-[800px] -top-96 left-1/2 -translate-x-1/2 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute w-[600px] h-[600px] top-1/2 -translate-y-1/2 -right-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[420px] mx-auto">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className={`inline-block p-4 rounded-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-xl border border-purple-500/20'
                : 'bg-white/40 backdrop-blur-xl border border-purple-100'
            }`}>
              <CatIcon className={`w-12 h-12 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h1 className={`text-3xl font-bold mt-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              B-Wiize
            </h1>
            <p className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Secure blockchain-powered student finance
            </p>
          </div>

          {/* Membership Card */}
          <div className={`relative mb-8 group transition-all duration-300 ${
            isMining ? 'animate-pulse' : 'hover:scale-[1.02]'
          }`}>
            <div className={`w-full rounded-2xl overflow-hidden ${
              isDark ? 'bg-[#2D2D2D]' : 'bg-gray-900'
            }`}>
              {/* Iridescent Overlay */}
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-teal-400/20 opacity-50" />

              {/* Card Content */}
              <div className="relative p-6" style={{ aspectRatio: '1.6' }}>
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="text-white/60" />
                    <QrCode className="text-white/40" />
                  </div>

                  {/* Card Info */}
                  <div className="flex-grow flex flex-col justify-end">
                    <div className="font-mono text-sm text-white/60">
                      {membershipCard?.tokenId || 'XRP-NFT-???'}
                    </div>
                    <div className="text-lg font-medium text-white mt-1">
                      {membershipCard?.metadata.tier || 'Student Membership'}
                    </div>
                    {membershipCard && (
                      <div className="text-sm text-white/60 mt-2">
                        Valid until {new Date(membershipCard.metadata.validUntil).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Shadow & Reflection */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent -z-10 blur-xl transform translate-y-1/2 scale-[0.95] opacity-50" />
          </div>

          {/* Actions */}
          <div className={`backdrop-blur-xl rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-900/40 border border-gray-700/50'
              : 'bg-white/40 border border-purple-100'
          }`}>
            <div className="space-y-4">
              {!walletState.isConnected ? (
                <button
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                    isDark
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'bg-teal-500 hover:bg-teal-600 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg`}
                >
                  <Link className="w-5 h-5" />
                  <span>Connect XRPL Wallet</span>
                </button>
              ) : !membershipCard ? (
                <>
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-gray-800/50' : 'bg-white/50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Mail className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`flex-grow bg-transparent border-0 focus:ring-0 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        } placeholder-gray-500`}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleMineCard}
                    disabled={isMining || !email}
                    className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                      isDark
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'bg-teal-500 hover:bg-teal-600 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg`}
                  >
                    <Key className="w-5 h-5" />
                    <span>{isMining ? 'Minting...' : 'Mine Your Card'}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleViewOnXRPL}
                  className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                    isDark
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>View on XRPL</span>
                </button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm backdrop-blur-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};