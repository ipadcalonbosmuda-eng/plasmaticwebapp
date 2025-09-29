'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/Button';
import { useWeb3 } from '@/hooks/useWeb3';
import { Wallet, AlertTriangle } from 'lucide-react';

export function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            className="flex items-center gap-3"
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} size="md">
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} variant="danger" size="md">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Wrong Network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-700">
                      {chain.name}
                    </span>
                  </div>

                  <Button
                    onClick={openAccountModal}
                    variant="secondary"
                    size="md"
                    className="font-mono"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

// Alternative simple connect button
export function SimpleConnectButton() {
  const { isConnected, connectWallet, address, balance, isOnPlasmaNetwork, switchToPlasma } = useWeb3();

  if (!isConnected) {
    return (
      <Button onClick={connectWallet} size="md">
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  if (!isOnPlasmaNetwork) {
    return (
      <Button onClick={switchToPlasma} variant="danger" size="md">
        <AlertTriangle className="w-4 h-4 mr-2" />
        Switch to Plasma
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-emerald-700">Plasma Network</span>
      </div>
      
      <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg">
        <div className="text-xs text-gray-500">Balance</div>
        <div className="font-mono font-semibold text-gray-900">{balance} XPL</div>
      </div>

      <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg font-mono text-sm">
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </div>
    </div>
  );
}
