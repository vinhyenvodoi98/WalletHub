import { useState } from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { useAccount, useBalance } from 'wagmi';

interface Token {
  symbol: string;
  address: string;
  logo: string;
}

const TOKENS: Token[] = [
  {
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    logo: '/eth-logo.png'
  },
  {
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    logo: '/usdc-logo.png'
  },
  // Add more tokens as needed
];

export const SwapComponent = () => {
  const { address } = useAccount();
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const { data: balance } = useBalance({
    address,
    token: fromToken.address === '0x0000000000000000000000000000000000000000' ? undefined : (fromToken.address as `0x${string}`),
  });

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Swap</h2>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* From Token Input */}
      <div className="bg-gray-50 p-4 rounded-2xl mb-2">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">You pay</span>
          <span className="text-sm text-gray-500">
            Balance: {balance?.formatted ?? '0'} {fromToken.symbol}
          </span>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="w-full text-2xl bg-transparent outline-none"
            placeholder="0"
          />
          <button className="flex items-center gap-2 bg-gray-100 py-2 px-4 rounded-2xl hover:bg-gray-200">
            <img src={fromToken.logo} alt={fromToken.symbol} className="w-6 h-6" />
            <span className="font-semibold">{fromToken.symbol}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className="flex justify-center -my-3 z-10 relative">
        <button
          onClick={handleSwapTokens}
          className="bg-gray-100 p-2 rounded-xl hover:bg-gray-200 border border-gray-200"
        >
          <ArrowDownIcon className="w-6 h-6" />
        </button>
      </div>

      {/* To Token Input */}
      <div className="bg-gray-50 p-4 rounded-2xl mt-2">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">You receive</span>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            className="w-full text-2xl bg-transparent outline-none"
            placeholder="0"
          />
          <button className="flex items-center gap-2 bg-gray-100 py-2 px-4 rounded-2xl hover:bg-gray-200">
            <img src={toToken.logo} alt={toToken.symbol} className="w-6 h-6" />
            <span className="font-semibold">{toToken.symbol}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swap Details */}
      <div className="mt-4 bg-gray-50 rounded-2xl p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Exchange Rate</span>
          <span>1 {fromToken.symbol} = 1,800 {toToken.symbol}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">Network Fee</span>
          <span>~$5.00</span>
        </div>
      </div>

      {/* Swap Button */}
      <button
        className="w-full bg-purple-600 text-white py-4 rounded-2xl mt-4 font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={!fromAmount || !toAmount}
      >
        Swap
      </button>
    </div>
  );
};
