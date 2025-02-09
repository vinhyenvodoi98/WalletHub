import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useFundWallet } from '@privy-io/react-auth';
import { sepolia } from 'viem/chains';

interface SendEthModalProps {
  isOpen: boolean;
  onClose: () => void;
  fromAddress: string;
  toAddress: string;
}

export default function SendEthModal({ isOpen, onClose, fromAddress, toAddress }: SendEthModalProps) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { fundWallet } = useFundWallet();

  const handleSend = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromAddress,
          toAddress,
          amount
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send ETH');
      }

      toast.success('ETH sent successfully!');
      onClose();
    } catch (error) {
      console.error('Error sending ETH:', error);
      toast.error('Failed to send ETH. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivyFund = async () => {
    try {
      await fundWallet(toAddress,{
        chain: sepolia,
        amount: '0.01'
      });
      onClose();
    } catch (error) {
      console.error('Error funding through Privy:', error);
      toast.error('Failed to initiate funding. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
            Fund Wallet
          </Dialog.Title>

          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <button
                onClick={handlePrivyFund}
                className="w-full inline-flex justify-center rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Fund with Privy 💳
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or fund with ETH</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (ETH)
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="number"
                  step="0.000000000000000001"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 pl-4 pr-12 py-3 focus:border-blue-500 focus:ring-blue-500 text-lg"
                  placeholder="0.0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-gray-500 sm:text-lg">ETH</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">From</span>
                <span className="text-gray-900 font-medium truncate" title={fromAddress}>
                  {fromAddress && fromAddress.slice(0, 6)}...{fromAddress && fromAddress.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">To</span>
                <span className="text-gray-900 font-medium truncate" title={toAddress}>
                  {toAddress && toAddress.slice(0, 6)}...{toAddress && toAddress.slice(-4)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="w-full inline-flex justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Send ETH'
                )}
              </button>
              <button
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
