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

      // Create Privy policy
      const response = await fetch("https://api.privy.io/v1/policies", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'privy-app-id': process.env.PRIVY_APP_ID as string,
          'Authorization': `Basic ${Buffer.from(`${process.env.PRIVY_APP_ID as string}:${process.env.PRIVY_APP_SECRET as string}`).toString('base64')}`,
        },
        body: JSON.stringify({
          version: '1.0',
          name: `Policy for ${walletAddress}`,
          chain_type: 'ethereum',
          method_rules: [{
            method: 'eth_sendTransaction',
            rules: denyList.map((address: string) => ({
              name: `Block ${address}`,
              conditions: [{
                field_source: 'ethereum_transaction',
                field: 'to',
                operator: 'eq',
                value: address
              }],
              action: 'DENY'
            }))
          }],
          default_action: 'ALLOW'
        })
      });

      const data = await response.json();
      console.log(data);


      return res.status(200).json({});
    } catch (error) {
      console.error('Error saving policy:', error);
      return res.status(500).json({ error: 'Failed to save policy' });
    }
  }

  if (req.method === 'GET') {
    try {
      const { walletAddress, denyList } = req.query;

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
