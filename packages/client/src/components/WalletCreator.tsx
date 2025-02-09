"use client";
import { useState } from 'react';
import { toast } from 'react-toastify';

interface WalletDetails {
  id: string;
  address: string;
  chainType: string;
}

interface WalletCreatorProps {
  onAddWallet: (wallet: WalletDetails) => void;
}

export default function WalletCreator({ onAddWallet }: WalletCreatorProps) {
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
      onAddWallet(newWallet);
    } catch (error) {
      toast.error('Error creating wallet. Please try again.');
      console.error('Error creating wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <button
        onClick={handleCreateWallet}
        disabled={loading}
        className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-blue-500 hover:bg-gray-100 transition-colors">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="font-medium text-gray-900">
            {loading ? 'Creating...' : 'Add New Wallet'}
          </div>
        </div>
      </button>
    </div>
  );
}
