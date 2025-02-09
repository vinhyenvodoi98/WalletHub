import { useState } from 'react';
import { useRouter } from 'next/router';

export default function WalletPage() {
  const router = useRouter();
  const { address } = router.query;
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');

  const handleFund = async () => {
    // Implement funding logic
    console.log('Funding wallet:', address);
  };

  const handleSend = async () => {
    // Implement send transaction logic
    console.log('Sending', amount, 'to', recipientAddress);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Wallet Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Wallet Details</h1>
          <div className="bg-gray-50 p-4 rounded-lg break-all">
            <span className="text-gray-500">Address: </span>
            <span className="font-mono">{address}</span>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Fund Wallet Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Fund Wallet</h2>
            <button
              onClick={handleFund}
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

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">To/From</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">Send</td>
                  <td className="p-4">0.1 ETH</td>
                  <td className="p-4 font-mono">0x1234...5678</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
