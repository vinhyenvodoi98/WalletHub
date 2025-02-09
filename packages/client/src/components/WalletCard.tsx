import { useBalance } from 'wagmi';
import Link from 'next/link';
import { shortenAddress } from '@/utils/addresses';

interface WalletCardProps {
  address: string;
}

export default function WalletCard({ address }: WalletCardProps) {
  const { data: balanceData } = useBalance({
    address: address as `0x${string}`,
  });

  return (
    <Link
      href={`/wallet/${address}`}
      className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sm text-gray-500 font-mono">{shortenAddress(address)}</div>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          Active
        </div>
      </div>
      <div>
        <div className="text-gray-600 mb-1">Balance</div>
        <div className="text-2xl font-bold">
          {balanceData ? balanceData.formatted.toString() : '0'} ETH
        </div>
      </div>
    </Link>
  );
}
