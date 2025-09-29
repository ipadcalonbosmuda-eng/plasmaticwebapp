'use client';

import { useAccount, useBalance, useChainId, useDisconnect, useSwitchChain } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { plasmaNetwork } from '@/config/wagmi';
import { formatEther } from 'viem';
import { useMemo } from 'react';

export function useWeb3() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { openConnectModal } = useConnectModal();

  // Get XPL balance
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address,
    chainId: plasmaNetwork.id,
  });

  // Check if on correct network
  const isOnPlasmaNetwork = chainId === plasmaNetwork.id;

  // Format balance
  const formattedBalance = useMemo(() => {
    if (!balanceData) return '0.0000';
    return parseFloat(formatEther(balanceData.value)).toFixed(4);
  }, [balanceData]);

  // Switch to Plasma network
  const switchToPlasma = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    if (!isOnPlasmaNetwork) {
      try {
        await switchChain({ chainId: plasmaNetwork.id });
      } catch (error) {
        console.error('Failed to switch to Plasma network:', error);
        throw error;
      }
    }
  };

  // Connect wallet
  const connectWallet = () => {
    openConnectModal?.();
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    disconnect();
  };

  return {
    // Connection state
    address,
    isConnected,
    isConnecting: isConnecting || isReconnecting,
    
    // Network state
    chainId,
    isOnPlasmaNetwork,
    isSwitching,
    
    // Balance
    balance: formattedBalance,
    balanceRaw: balanceData,
    isBalanceLoading,
    
    // Actions
    connectWallet,
    disconnectWallet,
    switchToPlasma,
    
    // Network info
    networkName: isOnPlasmaNetwork ? 'Plasma Network' : 'Wrong Network',
    networkStatus: isOnPlasmaNetwork ? 'connected' : 'wrong-network',
  };
}
