import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/providers/Web3Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plasmatic Tools - Web3 Tools for Plasma Network',
  description: 'Deploy tokens, lock liquidity, manage vesting schedules, and more on Plasma Network.',
  keywords: ['Web3', 'DeFi', 'Plasma Network', 'Token Creation', 'Liquidity Locker', 'Token Vesting'],
  authors: [{ name: 'Plasmatic Team' }],
  openGraph: {
    title: 'Plasmatic Tools - Web3 Tools for Plasma Network',
    description: 'Deploy tokens, lock liquidity, manage vesting schedules, and more on Plasma Network.',
    url: 'https://app.plasmatic.tools',
    siteName: 'Plasmatic Tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plasmatic Tools - Web3 Tools for Plasma Network',
    description: 'Deploy tokens, lock liquidity, manage vesting schedules, and more on Plasma Network.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification tokens here
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/fonts/PPMori-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PPMori-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}