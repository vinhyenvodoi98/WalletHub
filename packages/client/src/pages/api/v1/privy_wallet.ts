import { PrivyClient } from '@privy-io/server-auth';
import { NextApiRequest, NextApiResponse } from 'next';

if (!process.env.PRIVY_APP_ID || !process.env.PRIVY_APP_SECRET) {
  throw new Error('Missing required Privy environment variables');
}

const privy = new PrivyClient(
  process.env.PRIVY_APP_ID,
  process.env.PRIVY_APP_SECRET
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Create a new embedded wallet
      const {id, address, chainType} = await privy.walletApi.create({chainType: 'ethereum'});
      return res.status(200).json({id, address, chainType});
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating wallet:', error);
      return res.status(500).json({ error: 'Failed to create wallet' });
    }
  }

  if (req.method === 'GET') {
    try {
      // Get wallet for a user
      const { id } = req.query;
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'Valid userId is required' });
      }

      const wallet = await privy.walletApi.getWallet({id});
      return res.status(200).json(wallet);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching wallet:', error);
      return res.status(500).json({ error: 'Failed to fetch wallet' });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
