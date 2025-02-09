import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { walletAddress, denyList, dailyLimit, transactionLimit } = req.body;

      if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address is required' });
      }

      return res.status(200).json({});
    } catch (error) {
      console.error('Error saving policy:', error);
      return res.status(500).json({ error: 'Failed to save policy' });
    }
  }

  if (req.method === 'GET') {
    try {
      const { walletAddress } = req.query;

      if (!walletAddress || Array.isArray(walletAddress)) {
        return res.status(400).json({ error: 'Valid wallet address is required' });
      }


      return res.status(200).json({
        walletAddress,
        denyList: [],
        dailyLimit: 0,
        transactionLimit: 0,
      });
    } catch (error) {
      console.error('Error fetching policy:', error);
      return res.status(500).json({ error: 'Failed to fetch policy' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
