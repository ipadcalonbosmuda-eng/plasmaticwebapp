'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Coins,
  Lock,
  Building2,
  Clock,
  Send,
  Menu,
  X,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
];

const tools = [
  { name: 'Token Creation', href: '/tools/token-creation', icon: Coins },
  { name: 'Token Locker', href: '/tools/token-locker', icon: Lock },
  { name: 'Liquidity Locker', href: '/tools/liquidity-locker', icon: Building2 },
  { name: 'Token Vesting', href: '/tools/token-vesting', icon: Clock },
  { name: 'Multi-Send', href: '/tools/multi-send', icon: Send },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-80 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200/50">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Plasmatic
                </h1>
                <p className="text-sm text-gray-500">Web3 Tools for Plasma</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={clsx(
                          'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:translate-x-1',
                          isActive
                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        )}
                      >
                        <item.icon
                          className={clsx(
                            'w-5 h-5 mr-3',
                            isActive ? 'text-emerald-600' : 'text-gray-400'
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Tools Section */}
            <div>
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Tools
              </h3>
              <ul className="space-y-2">
                {tools.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={clsx(
                          'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:translate-x-1 group',
                          isActive
                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        )}
                      >
                        <item.icon
                          className={clsx(
                            'w-5 h-5 mr-3',
                            isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
                          )}
                        />
                        {item.name}
                        <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          Soon
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200/50">
            <div className="text-xs text-gray-500 text-center">
              <p>Built for Plasma Network</p>
              <p className="mt-1">© 2025 Plasmatic Tools</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
