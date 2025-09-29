'use client';

import { Sidebar } from '@/components/Sidebar';
import { ConnectWallet } from '@/components/ConnectWallet';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100">
      <Sidebar />
      
      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1" />
            <ConnectWallet />
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
