import { useState } from "react";
import SendEthModal from "./SendEthModal";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { sepolia } from "viem/chains";
import { parseEther } from "viem";

interface Wallet {
  id: string;
  address: string;
  chainType: string;
}

export default function Fund() {
  const router = useRouter();
  const { address } = router.query;
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = usePrivy();

  const handleSend = async () => {
    try {
      if (!amount || !recipientAddress) {
        toast.error('Please enter amount and recipient address');
        return;
      }

      const walletsStr = localStorage.getItem('wallets');
      if (!walletsStr) {
        toast.error('No wallets found');
        return;
      }

      const wallets = JSON.parse(walletsStr) as Wallet[];
      const wallet = wallets.find((w: Wallet) => w.address === address);

      if (!wallet) {
        toast.error('Wallet not found');
        return;
      }

      const response = await fetch('/api/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletId: wallet.id,
          chainId: sepolia.id,
          toAddress: recipientAddress,
          amount: parseEther(amount).toString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send transaction');
      }

      toast.success(
        <div>
          Transaction sent successfully!{' '}
          <a
            href={`https://sepolia.etherscan.io/tx/${data.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Etherscan
          </a>
        </div>
      );
      setAmount('');
      setRecipientAddress('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send transaction');
    }
  };

  return (
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
  )
}
