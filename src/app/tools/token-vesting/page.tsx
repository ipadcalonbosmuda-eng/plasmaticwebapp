'use client';

import { ComingSoon } from '@/components/ComingSoon';
import { Clock } from 'lucide-react';

export default function TokenVestingPage() {
  return (
    <ComingSoon
      title="Token Vesting"
      description="Set structured vesting schedules for teams, advisors, and investors. Support cliffs, gradual release, and self-claim functionality directly through the Web App with full transparency."
      icon={Clock}
      targetHours={24}
    />
  );
}
