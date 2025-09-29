'use client';

import { ComingSoon } from '@/components/ComingSoon';
import { Lock } from 'lucide-react';

export default function TokenLockerPage() {
  return (
    <ComingSoon
      title="Token Locker"
      description="Lock tokens on-chain for community confidence and trust. Set customizable duration, cliff periods, and generate public proof links for complete transparency and verification."
      icon={Lock}
      targetHours={24}
    />
  );
}
