'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { config } from '@/config/wagmi';
import { useState } from 'react';

import '@rainbow-me/rainbowkit/styles.css';

const customTheme = lightTheme({
  accentColor: '#00d4aa',
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

interface Web3ProviderProps {
  children: React.ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 3,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={customTheme}
          showRecentTransactions={true}
          appInfo={{
            appName: 'Plasmatic Tools',
            disclaimer: ({ Text, Link }) => (
              <Text>
                By connecting your wallet, you agree to the{' '}
                <Link href="https://www.plasmatic.tools/terms">Terms of Service</Link> and{' '}
                <Link href="https://www.plasmatic.tools/privacy">Privacy Policy</Link>.
              </Text>
            ),
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
