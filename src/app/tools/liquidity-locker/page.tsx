'use client';

import { ComingSoon } from '@/components/ComingSoon';
import { Building2 } from 'lucide-react';

export default function LiquidityLockerPage() {
  return (
    <ComingSoon
      title="Liquidity Locker"
      description="Protect LP positions by locking liquidity with defined unlock schedules. Assure traders of long-term stability and build confidence in your project with transparent liquidity locks."
      icon={Building2}
      targetHours={24}
    />
  );
}
