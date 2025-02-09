import { privy } from '@/lib/privy';
import { inngest } from '../client';

export const scheduleTransaction = inngest.createFunction(
  {
    id: 'schedule-transaction',
    name: 'Schedule Transaction'
  },
  { event: 'eth/schedule.transaction' },
  async ({ event, step }: {
    event: {
      data: {
        walletId: string;
        chainId: number;
        toAddress: string;
        amount: string;
        scheduledTime: string;
      }
    };
    step: any
  }) => {
    const { walletId, chainId, toAddress, amount, scheduledTime } = event.data;

    // Wait until the scheduled time
    await step.sleep('wait-until-scheduled-time', scheduledTime);

    try {
      // Execute the transaction
      const result = await step.run('execute-transaction', async () => {
        const {hash} = await privy.walletApi.ethereum.sendTransaction({
          walletId: walletId,
          caip2: `eip155:${chainId}`,
          transaction: {
            to: toAddress as `0x${string}`,
            value: Number(amount),
            chainId: chainId,
          },
        });
        return hash;
      });

      return { success: true, txHash: result.hash };
    } catch (error) {
      console.error('Error executing transaction:', error);
      throw error;
    }
  }
);
