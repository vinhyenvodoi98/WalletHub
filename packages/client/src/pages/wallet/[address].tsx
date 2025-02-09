'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import History from '@/components/History';
import { SwapComponent } from '@/components/Swap';
import { useBalance } from 'wagmi';
import Policy from '@/components/Policy';
import Fund from '@/components/Fund';
import Schedule from '@/components/Schedule';
import { ChatBot } from '@/components/ChatBot';

export default function WalletPage() {
  const router = useRouter();
  const { address } = router.query;
  const [balance, setBalance] = useState<string>('');
  const [activeTab, setActiveTab] = useState('fund'); // 'fund', 'policy', 'swap', 'history'

  const { data: balanceData } = useBalance({
    address: address as `0x${string}`,
  });

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.formatted.toString());
    }
  }, [balanceData]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('fund')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'fund' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            Fund Wallet
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'chat' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'policy' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            Policy
          </button>
          <button
            onClick={() => setActiveTab('swap')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'swap' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            Swap
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'schedule' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            Schedule
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'history' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Wallet Overview */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4">Wallet Details</h1>
            <div className="bg-gray-50 p-4 rounded-lg break-all">
              <span className="text-gray-500">Address: </span>
              <span className="font-mono">{address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Balance: </span>
              <span className="font-mono">{balance ? `${Number(balance).toFixed(4)} ETH` : 'Loading...'}</span>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'fund' && (
            <Fund />
          )}

          {activeTab === 'policy' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Policy Settings</h2>
              <Policy />
            </div>
          )}

          {activeTab === 'chat' && <ChatBot />}

          {activeTab === 'swap' && <SwapComponent />}

          {activeTab === 'schedule' && <Schedule />}

          {activeTab === 'history' && <History />}
        </div>
      </div>
    </div>
  );
}
