'use client';

import {PrivyProvider} from '@privy-io/react-auth';
import { sepolia } from 'viem/chains';

export default function Providers({children}: {children: React.ReactNode}) {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    throw new Error('NEXT_PUBLIC_PRIVY_APP_ID is not defined');
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: '/images/lumpa.png',
        },
        defaultChain: sepolia,
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
            paymentMethod: 'credit_debit_card', // Purchase with credit or debit card
            uiConfig: {accentColor: '#696FFD', theme: 'light'}, // Styling preferences for MoonPay's UIs
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
