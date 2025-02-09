import { NextApiRequest, NextApiResponse } from 'next';
import { inngest } from '@/inngest/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletId, chainId, toAddress, amount, time } = req.body;

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const scheduledTime = new Date(time);
    if (isNaN(scheduledTime.getTime())) {
      return res.status(400).json({ error: 'Invalid time' });
    }

    // Schedule the transaction using Inngest
    await inngest.send({
      name: 'eth/schedule.transaction',
      data: {
        toAddress,
        amount: amount.toString(),
        scheduledTime: scheduledTime.toISOString(),
        walletId,
        chainId,
      },
      scheduledFor: scheduledTime.toISOString(),
    });

    return res.status(200).json({
      message: 'Transaction scheduled successfully',
    });

  } catch (error) {
    console.error('Schedule API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
