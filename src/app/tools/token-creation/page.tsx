'use client';

import { ComingSoon } from '@/components/ComingSoon';
import { Coins } from 'lucide-react';

export default function TokenCreationPage() {
  return (
    <ComingSoon
      title="Token Creation"
      description="Create custom tokens with configurable supply, name, symbol, and advanced features. Deploy directly on Plasma Network with automatic contract verification and transparent on-chain proofs."
      icon={Coins}
      targetHours={24}
    />
  );
}
