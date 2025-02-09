import { useState, useEffect } from 'react';
import Link from 'next/link';

import WalletCreator from '@/components/WalletCreator';
import WalletCard from '@/components/WalletCard';

import { shortenAddress } from '@/utils/addresses';

interface WalletDetails {
  id: string;
  address: string;
  chainType: string;
}

export default function AppPage() {
  const [wallets, setWallets] = useState<WalletDetails[]>([]);

  useEffect(() => {
    // Load wallets from localStorage on component mount
    const storedWallets = localStorage.getItem('wallets');
    if (storedWallets) {
      setWallets(JSON.parse(storedWallets));
    }
  }, []);

  const addWallet = (newWallet: WalletDetails) => {
    const updatedWallets = [...wallets, newWallet];
    setWallets(updatedWallets);
    localStorage.setItem('wallets', JSON.stringify(updatedWallets));
  };

  return (
    <div className="flex h-screen bg-gray-50">
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
                <WalletCard
                  key={wallet.address}
                  address={wallet.address}
                />
              ))}

              {/* Add New Wallet Card */}
              <WalletCreator onAddWallet={addWallet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
