'use client';

import { Sidebar } from '@/components/Sidebar';
import { ConnectWallet } from '@/components/ConnectWallet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useWeb3 } from '@/hooks/useWeb3';
import { 
  Coins, 
  Lock, 
  Building2, 
  Clock, 
  Send,
  TrendingUp,
  Shield,
  Zap,
  ExternalLink
} from 'lucide-react';

const features = [
  {
    name: 'Token Creation',
    description: 'Create custom tokens with configurable supply, name, and symbol on Plasma Network.',
    icon: Coins,
    href: '/tools/token-creation',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    name: 'Token Locker',
    description: 'Lock tokens on-chain for community confidence with customizable duration and cliff periods.',
    icon: Lock,
    href: '/tools/token-locker',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Liquidity Locker',
    description: 'Protect LP positions by locking liquidity with defined unlock schedules.',
    icon: Building2,
    href: '/tools/liquidity-locker',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Token Vesting',
    description: 'Set structured vesting schedules for teams, advisors, and investors.',
    icon: Clock,
    href: '/tools/token-vesting',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Multi-Send',
    description: 'Send tokens to multiple wallets in a single transaction, perfect for airdrops.',
    icon: Send,
    href: '/tools/multi-send',
    gradient: 'from-cyan-500 to-blue-500',
  },
];

const stats = [
  { name: 'Network Status', value: 'Online', icon: TrendingUp, color: 'text-emerald-600' },
  { name: 'Chain ID', value: '9745', icon: Shield, color: 'text-blue-600' },
  { name: 'Block Explorer', value: 'PlasmaExplorer', icon: ExternalLink, color: 'text-purple-600' },
];

export default function Dashboard() {
  const { isConnected, balance } = useWeb3();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100">
      <Sidebar />
      
      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-ppmori-semibold">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome to Plasmatic Tools</p>
            </div>
            <ConnectWallet />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-8">
          {/* Welcome Section */}
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl mb-6 animate-float">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-ppmori-semibold">
              Welcome to{' '}
              <span className="gradient-text">Plasmatic</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive Web3 toolkit for the Plasma Network. Deploy tokens, lock liquidity, 
              manage vesting schedules, and more with professional-grade security.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.name} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {stat.name}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2 font-ppmori-semibold">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* User Balance Card */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Your Balance
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2 font-ppmori-semibold">
                      {isConnected ? `${balance} XPL` : 'Connect Wallet'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
                    <Coins className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-ppmori-semibold">
                Powerful Web3 Tools
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to build, manage, and secure your tokens on Plasma Network
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card 
                  key={feature.name} 
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0 bg-gradient-to-br from-white via-white to-gray-50"
                >
                  <CardHeader className="pb-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-ppmori-semibold group-hover:text-emerald-600 transition-colors">
                      {feature.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-700 transition-all"
                      >
                        Coming Soon
                      </Button>
                      <div className="flex items-center text-amber-600 text-sm font-medium">
                        <Clock className="w-4 h-4 mr-1" />
                        24h
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Network Info */}
          <Card className="bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-emerald-200">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-ppmori-semibold">
                    Built for Plasma Network
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Optimized exclusively for Plasma Network with maximum security and performance.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Chain ID: 9745</span>
                    <span>•</span>
                    <span>Currency: XPL</span>
                    <span>•</span>
                    <span>RPC: rpc.plasma.to</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl animate-pulse-slow">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}