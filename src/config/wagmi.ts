import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';

// Define Plasma Network
export const plasmaNetwork = defineChain({
  id: 9745,
  name: 'Plasma Mainnet Beta',
  nativeCurrency: {
    decimals: 18,
    name: 'XPL',
    symbol: 'XPL',
  },
  rpcUrls: {
    default: { http: ['https://rpc.plasma.to'] },
  },
  blockExplorers: {
    default: { name: 'PlasmaExplorer', url: 'https://plasmascan.to' },
  },
  contracts: {
    // Add contract addresses here when available
  },
});

export const config = getDefaultConfig({
  appName: 'Plasmatic Tools',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [plasmaNetwork],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export const PLASMA_NETWORK_CONFIG = {
  chainId: 9745,
  chainName: 'Plasma Mainnet Beta',
  nativeCurrency: {
    name: 'XPL',
    symbol: 'XPL',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.plasma.to'],
  blockExplorerUrls: ['https://plasmascan.to/'],
  iconUrls: [], // Add icon URLs if available
};
