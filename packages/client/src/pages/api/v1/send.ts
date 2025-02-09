import { privy } from '@/lib/privy';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletId, chainId, toAddress, amount } = req.body;

    if (!walletId || !toAddress || !amount) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const {hash} = await privy.walletApi.ethereum.sendTransaction({
      walletId: walletId,
      caip2: `eip155:${chainId}`,
      transaction: {
        to: toAddress as `0x${string}`,
        value: Number(amount),
        chainId: chainId,
      },
    });

    return res.status(200).json({
      hash: hash
    });

  } catch (error) {
    console.error('Error sending transaction:', error);
    return res.status(500).json({ error: 'Failed to send transaction' });
  }
}
