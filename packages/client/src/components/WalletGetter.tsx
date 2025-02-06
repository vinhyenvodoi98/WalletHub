import { useState } from 'react';
import { toast } from 'react-toastify';

export default function WalletGetter() {
  const [walletId, setWalletId] = useState('');

  const handleGetWallet = async () => {
    try {
      const response = await fetch(`/api/v1/privy_wallet?id=${walletId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get wallet');
      }

      toast.success(`Wallet found: ${data.address}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
      toast.error('Failed to get wallet');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={walletId}
        onChange={(e) => setWalletId(e.target.value)}
        placeholder="Enter Wallet ID"
        className="p-2 border rounded"
      />
      <button
        onClick={handleGetWallet}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Get Wallet
      </button>
    </div>
  );
}
