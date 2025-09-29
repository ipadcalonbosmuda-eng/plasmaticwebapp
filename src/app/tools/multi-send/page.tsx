'use client';

import { ComingSoon } from '@/components/ComingSoon';
import { Send } from 'lucide-react';

export default function MultiSendPage() {
  return (
    <ComingSoon
      title="Multi-Send"
      description="Send tokens to multiple wallets in a single transaction. Perfect for airdrops, community rewards, or bulk payouts while saving time and gas fees on Plasma Network."
      icon={Send}
      targetHours={24}
    />
  );
}
