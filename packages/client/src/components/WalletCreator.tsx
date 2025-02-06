"use client";
import { useState } from 'react';

interface WalletDetails {
  id: string;
  address: string;
  chainType: string;
}

export default function WalletCreator() {
  const [wallet, setWallet] = useState<WalletDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateWallet = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/v1/privy_wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create wallet');
      }

      const newWallet = await response.json();
      setWallet(newWallet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleCreateWallet}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 w-full"
      >
        {loading ? 'Creating...' : 'Create Wallet'}
      </button>

      {error && (
        <div className="text-red-500 mt-2">
          Error: {error}
        </div>
      )}

      {wallet && (
        <div className="mt-4">
          <h3 className="font-bold">Wallet Details:</h3>
          <div className="mt-2">
            <p>ID: {wallet.id}</p>
            <p>Address: {wallet.address}</p>
            <p>Chain Type: {wallet.chainType}</p>
          </div>
        </div>
      )}
    </div>
  );
}
