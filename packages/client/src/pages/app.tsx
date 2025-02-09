import WalletCreator from '@/components/WalletCreator';
import Link from 'next/link';
import { useState } from 'react';

interface Wallet {
  address: string;
  name: string;
  balance: string;
}

export default function AppPage() {
  const [wallets] = useState<Wallet[]>([
    { address: '0x1234...5678', name: 'Main Wallet', balance: '1.5 ETH' },
    { address: '0x8765...4321', name: 'Savings', balance: '0.5 ETH' },
  ]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">My Wallets</h2>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <Link
                key={wallet.address}
                href={`/wallet/${wallet.address}`}
                className="block w-full p-3 text-left rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">{wallet.name}</div>
                <div className="text-sm text-gray-400 truncate">{wallet.address}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-gray-800">
          <WalletCreator />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Wallet Dashboard</h1>
              <p className="text-gray-600">Manage your crypto assets and wallets</p>
            </div>

            {/* Total Balance Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="text-gray-600 mb-2">Total Balance</div>
              <div className="text-4xl font-bold">2.0 ETH</div>
            </div>

            {/* Wallets Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallets.map((wallet) => (
                <Link
                  key={wallet.address}
                  href={`/wallet/${wallet.address}`}
                  className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{wallet.name}</h3>
                      <div className="text-sm text-gray-500 font-mono">{wallet.address}</div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Active
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Balance</div>
                    <div className="text-2xl font-bold">{wallet.balance}</div>
                  </div>
                </Link>
              ))}

              {/* Add New Wallet Card */}
              <button className="flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-blue-500 hover:bg-gray-100 transition-colors">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="font-medium text-gray-900">Add New Wallet</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
