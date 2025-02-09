import { serve } from 'inngest/next';
import { scheduleTransaction } from '@/inngest/functions/scheduleTransaction';
import { inngest } from '@/inngest/client';


export default serve({
  client: inngest,
  functions: [scheduleTransaction],
});
