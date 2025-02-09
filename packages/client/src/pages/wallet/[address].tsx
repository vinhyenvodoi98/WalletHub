'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SendEthModal from '@/components/SendEthModal';
import { usePrivy } from '@privy-io/react-auth';
import History from '@/components/History';
import { SwapComponent } from '@/components/Swap';
import { useBalance } from 'wagmi';
import Policy from '@/components/Policy';

export default function WalletPage() {
  const router = useRouter();
  const { address } = router.query;
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = usePrivy();
  const [balance, setBalance] = useState<string>('');
  const [activeTab, setActiveTab] = useState('fund'); // 'fund', 'policy', 'swap', 'history'

  const handleSend = async () => {
    // Implement send transaction logic
    console.log('Sending', amount, 'to', recipientAddress);
  };

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
            onClick={() => setActiveTab('history')}
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Fund Wallet</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-green-500 text-white py-4 px-6 rounded-lg text-xl font-bold hover:bg-green-600 transition-colors"
                >
                  Fund Wallet
                </button>
              </div>
                        {/* Send Transaction Card */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Send Transaction</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Amount (ETH)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Recipient Address</label>
                    <input
                      type="text"
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0x..."
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg text-xl font-bold hover:bg-blue-600 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
          </div>
          )}

          {activeTab === 'policy' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Policy Settings</h2>
              <Policy />
            </div>
          )}

          {activeTab === 'swap' && <SwapComponent />}

          {activeTab === 'history' && <History />}
        </div>

        <SendEthModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            router.push(`/wallet/${address}`, undefined, { shallow: true });
          }}
          fromAddress={user?.wallet?.address as string}
          toAddress={address as string}
        />
      </div>
    </div>
  );
}
