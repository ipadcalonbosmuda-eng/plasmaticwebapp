'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Clock, Rocket } from 'lucide-react';

import { LucideIcon } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  targetHours?: number;
}

export function ComingSoon({ 
  title, 
  description, 
  icon: Icon = Rocket,
  targetHours = 24 
}: ComingSoonProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: targetHours,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate target time (24 hours from now)
    const targetTime = new Date().getTime() + (targetHours * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetHours]);

  const isLive = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl mb-8 animate-float">
          <Icon className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-ppmori-semibold">
          <span className="gradient-text">{title}</span>
        </h1>

        {/* Timer Card */}
        <Card className="mb-8 bg-gradient-to-r from-white via-white to-gray-50 border-0 shadow-xl">
          <CardContent className="p-8">
            {isLive ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-emerald-600 mb-2 font-ppmori-semibold">
                  🎉 Live Now!
                </h2>
                <p className="text-gray-600">The feature is now available!</p>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-ppmori-semibold">
                  Coming Soon
                </h2>
                
                {/* Countdown Timer */}
                <div className="flex justify-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-white font-ppmori-semibold">
                        {timeLeft.hours.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Hours
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-white font-ppmori-semibold">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Minutes
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-white font-ppmori-semibold">
                        {timeLeft.seconds.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Seconds
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-lg">
                  This feature will be available soon. Stay tuned!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Description */}
        <p className="text-xl text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Additional Info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Updates every second</span>
        </div>
      </div>
    </div>
  );
}
