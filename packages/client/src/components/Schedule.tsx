import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { sepolia } from 'viem/chains';

interface Wallet {
  id: string;
  address: string;
  chainType: string;
}

export default function Schedule() {
  const [amount, setAmount] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [addressError, setAddressError] = useState<string>('');
  const router = useRouter();
  const { address } = router.query;

  const validateAddress = (address: string) => {
    if (!address) {
      setAddressError('Address is required');
      return false;
    }

    setAddressError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAddress(toAddress)) return;

    const walletsStr = localStorage.getItem('wallets');
    if (!walletsStr) {
      toast.error('No wallets found');
      return;
    }

    const wallets = JSON.parse(walletsStr) as Wallet[];
    const wallet = wallets.find((w) => w.address === address);

    if (!wallet) {
      toast.error('Wallet not found');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, time, toAddress, walletId: wallet.id, chainId: sepolia.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule transaction');
      }

      toast.success('Transaction scheduled successfully');
      // Clear form
      setAmount('');
      setTime('');
      setToAddress('');
    } catch (error) {
      console.error('Error scheduling transaction:', error);
      toast.error('Failed to schedule transaction');
    } finally {
      setIsLoading(false);
    }
  };

  const minDateTime = new Date();
  minDateTime.setMinutes(minDateTime.getMinutes() + 5); // Minimum 5 minutes from now
  const minDateTimeString = minDateTime.toISOString().slice(0, 16);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Schedule Transaction</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="toAddress" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            id="toAddress"
            type="text"
            value={toAddress}
            onChange={(e) => {
              setToAddress(e.target.value);
              validateAddress(e.target.value);
            }}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
              ${addressError ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="0x..."
            required
          />
          {addressError && (
            <p className="mt-1 text-sm text-red-500">{addressError}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (ETH)
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              step="0.0001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.0"
              required
            />
            <span className="absolute right-3 top-3 text-gray-500">ETH</span>
          </div>
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
            Schedule Time
          </label>
          <input
            id="time"
            type="datetime-local"
            value={time}
            min={minDateTimeString}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Minimum 5 minutes from current time
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
            ${isLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Scheduling...
            </span>
          ) : (
            'Schedule Transaction'
          )}
        </button>
      </form>
    </div>
  );
}