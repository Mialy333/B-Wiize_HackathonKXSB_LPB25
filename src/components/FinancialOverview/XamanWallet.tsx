import React, { useState } from 'react';
import { Coins, Link, Link2Off as LinkOff, QrCode, ArrowUp, Wallet, Lock, Unlock, CheckCircle } from 'lucide-react';
import { CardProps, XamanWalletData, EscrowData } from './types';
import { useTheme } from '../../ThemeContext';

interface XamanWalletProps extends CardProps {
  xamanWallet?: XamanWalletData;
  escrow?: EscrowData;
  onConnectXaman?: () => void;
  onDepositXRP?: (amount: number) => void;
  onCreateEscrow?: (amount: number) => void;
  onReleaseEscrow?: () => void;
}

export const XamanWallet: React.FC<XamanWalletProps> = ({
  isLoading,
  error,
  onRetry,
  xamanWallet,
  escrow,
  onConnectXaman,
  onDepositXRP,
  onCreateEscrow,
  onReleaseEscrow,
}) => {
  const { isDark } = useTheme();
  const [depositAmount, setDepositAmount] = useState(5);
  const [escrowAmount, setEscrowAmount] = useState(30);
  const [showQR, setShowQR] = useState(false);
  const [isCreatingEscrow, setIsCreatingEscrow] = useState(false);

  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      <div className={`h-12 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`} />
      <div className={`h-8 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg w-2/3`} />
    </div>
  );

  const ErrorState = ({ message }: { message: string }) => (
    <div className="text-center py-4">
      <p className="text-red-500 mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );

  const handleCreateEscrow = () => {
    setIsCreatingEscrow(false);
    onCreateEscrow?.(escrowAmount);
  };

  if (isLoading) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} />;

  const xamanXrpInUsd = (xamanWallet?.xrp || 0) * (xamanWallet?.usdRate || 0);
  const escrowXrpInUsd = (escrow?.amount || 0) * (xamanWallet?.usdRate || 0);

  return (
    <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    } shadow-sm hover:shadow-md`}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Wallet className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            DeFi Wallet
          </h3>
        </div>

        <div className={`p-4 rounded-xl ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-purple-900/30' 
            : 'bg-gradient-to-br from-gray-50 via-gray-50 to-purple-100/50'
        } relative overflow-hidden`}>
          {/* Iridescent Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-500/5 to-teal-400/5 animate-shimmer opacity-50" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                XRPL Integration
              </h4>
              {!xamanWallet?.isConnected && (
                <button
                  onClick={() => {
                    onConnectXaman?.();
                    setShowQR(true);
                  }}
                  className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors transform hover:scale-105 ${
                    xamanWallet?.isConnecting
                      ? isDark
                        ? 'bg-purple-500/20 text-purple-400 animate-pulse'
                        : 'bg-purple-100 text-purple-700 animate-pulse'
                      : isDark
                      ? 'bg-teal-600 text-white hover:bg-teal-700'
                      : 'bg-teal-500 text-white hover:bg-teal-600'
                  }`}
                >
                  <Link className="w-3 h-3 mr-1.5" />
                  {xamanWallet?.isConnecting ? 'Connecting...' : 'Connect Xaman Wallet'}
                </button>
              )}
              {xamanWallet?.isConnected && (
                <div className={`px-2 py-1 rounded-full text-xs ${
                  isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                }`}>
                  Connected
                </div>
              )}
            </div>

            {showQR && !xamanWallet?.isConnected && (
              <div className="mb-4">
                <div className="flex flex-col items-center">
                  {/* QR Code Placeholder */}
                  <div className="relative w-32 h-32 bg-white p-2 rounded-lg mb-2 mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-gray-800" />
                    </div>
                    <div className="absolute inset-0 border-2 border-teal-500 rounded-lg" />
                  </div>
                  <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Scan with Xaman Wallet app to connect
                  </p>
                </div>
              </div>
            )}

            {xamanWallet?.isConnected ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className={`text-2xl font-medium ${
                    isDark ? 'text-teal-400' : 'text-teal-600'
                  }`}>
                    {xamanWallet.xrp.toFixed(2)} XRP
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      USD Value
                    </span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-900'}>
                      ${xamanXrpInUsd.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Coins className={`w-4 h-4 mr-1.5 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Rate: ${xamanWallet.usdRate}/XRP
                    </span>
                  </div>
                  {xamanWallet.address && (
                    <div className="flex items-center text-xs mt-1">
                      <span className={`font-mono truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {xamanWallet.address.substring(0, 8)}...{xamanWallet.address.substring(xamanWallet.address.length - 8)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Deposit XRP Section */}
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Deposit XRP
                    </span>
                    <div className="flex items-center">
                      <button 
                        onClick={() => setDepositAmount(Math.max(1, depositAmount - 1))}
                        className={`w-6 h-6 flex items-center justify-center rounded-full ${
                          isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        -
                      </button>
                      <span className={`mx-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {depositAmount} XRP
                      </span>
                      <button 
                        onClick={() => setDepositAmount(depositAmount + 1)}
                        className={`w-6 h-6 flex items-center justify-center rounded-full ${
                          isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onDepositXRP?.(depositAmount)}
                    className={`w-full py-2 mt-2 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 ${
                      isDark
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'bg-teal-500 hover:bg-teal-600 text-white'
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" />
                    <span>Sign Transaction</span>
                  </button>
                  <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    This will open Xaman to sign the transaction
                  </p>
                </div>

                {/* XRPL Escrow Section */}
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-purple-900/20 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                      Locked XRP Escrow
                    </span>
                    {escrow && (
                      <div className={`px-2 py-0.5 rounded-full text-xs ${
                        escrow.status === 'Ready'
                          ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                          : escrow.status === 'Released'
                          ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                          : isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {escrow.status}
                      </div>
                    )}
                  </div>

                  {escrow ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Amount:
                        </span>
                        <span className={`font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                          {escrow.amount} XRP (${escrowXrpInUsd.toFixed(2)})
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Condition:
                        </span>
                        <span className={`font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                          {escrow.challengesCompleted}/{escrow.totalChallengesRequired} Challenges
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className={`h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            escrow.status === 'Ready' || escrow.status === 'Released'
                              ? isDark ? 'bg-green-500' : 'bg-green-500'
                              : isDark ? 'bg-purple-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${(escrow.challengesCompleted / escrow.totalChallengesRequired) * 100}%` }}
                        />
                      </div>
                      
                      <button
                        onClick={onReleaseEscrow}
                        disabled={escrow.status !== 'Ready'}
                        className={`w-full py-2 mt-1 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                          escrow.status === 'Ready'
                            ? isDark
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                            : isDark
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Unlock className="w-4 h-4" />
                        <span>Release Escrow</span>
                      </button>
                      
                      {escrow.status === 'Locked' && (
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Complete {escrow.totalChallengesRequired - escrow.challengesCompleted} more challenges to unlock
                        </p>
                      )}
                      
                      {escrow.status === 'Ready' && (
                        <p className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                          Challenges completed! You can now release your XRP
                        </p>
                      )}
                      
                      {escrow.status === 'Released' && (
                        <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          Escrow has been released to your wallet
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {isCreatingEscrow ? (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Amount to lock:
                            </span>
                            <div className="flex items-center">
                              <button 
                                onClick={() => setEscrowAmount(Math.max(5, escrowAmount - 5))}
                                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                                  isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                -
                              </button>
                              <span className={`mx-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {escrowAmount} XRP
                              </span>
                              <button 
                                onClick={() => setEscrowAmount(escrowAmount + 5)}
                                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                                  isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Condition:
                            </span>
                            <span className={`font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                              Complete 3 Challenges
                            </span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setIsCreatingEscrow(false)}
                              className={`flex-1 py-2 rounded-lg ${
                                isDark
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleCreateEscrow}
                              className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                                isDark
                                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                  : 'bg-purple-500 hover:bg-purple-600 text-white'
                              }`}
                            >
                              <Lock className="w-4 h-4" />
                              <span>Create Escrow</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Lock XRP that will be released after completing 3 challenges.
                          </p>
                          
                          <button
                            onClick={() => setIsCreatingEscrow(true)}
                            className={`w-full py-2 rounded-lg flex items-center justify-center space-x-2 ${
                              isDark
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-purple-500 hover:bg-purple-600 text-white'
                            }`}
                          >
                            <Lock className="w-4 h-4" />
                            <span>Lock XRP in Escrow</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : xamanWallet?.error ? (
              <div className="text-center py-4">
                <p className="text-red-500 text-sm">{xamanWallet.error}</p>
                <button
                  onClick={onConnectXaman}
                  className="mt-2 text-sm text-teal-500 hover:text-teal-600"
                >
                  Try Again
                </button>
              </div>
            ) : !showQR ? (
              <div className={`text-center py-6 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Connect Xaman Wallet to access XRPL features
              </div>
            ) : null}

            {/* Integration Comment */}
            <div className={`mt-2 text-xs italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {/* This comment would be removed in production */}
              {/* 
                Real XRPL escrow integration would use:
                
                // Initialize XRPL client
                const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
                await client.connect()
                
                // Create escrow
                const escrowCreate = {
                  TransactionType: "EscrowCreate",
                  Account: wallet.address,
                  Amount: xrpl.xrpToDrops(30),
                  Condition: "A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100",
                  FinishAfter: xrpl.isoTimeToRippleTime(finishAfterDate),
                  Destination: wallet.address
                }
                
                // Sign and submit
                const escrowTx = await client.submitAndWait(escrowCreate, { wallet })
                
                // Release escrow
                const escrowFinish = {
                  TransactionType: "EscrowFinish",
                  Account: wallet.address,
                  Owner: wallet.address,
                  OfferSequence: escrowSequence,
                  Fulfillment: "A0028000"
                }
                
                const finishTx = await client.submitAndWait(escrowFinish, { wallet })
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};