import WalletCreator from '@/components/WalletCreator';
import WalletGetter from '@/components/WalletGetter';
import Layout from '@/components/layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      <WalletCreator />
      <WalletGetter />
    </Layout>
  );
}
