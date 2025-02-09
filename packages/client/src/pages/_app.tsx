import { AppProps } from 'next/app';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Header from '@/components/layout/Header';
import '@/styles/colors.css';
import '@/styles/globals.css';
import { useIsSsr } from '../utils/ssr';
import Providers from '@/components/PrivyProvidor';
import { WagmiProvider } from '@/components/WagmiProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <Providers>
      <WagmiProvider>
        <Header />
          <Component {...pageProps} />
        <ToastContainer position="bottom-right" newestOnTop />
      </WagmiProvider>
    </Providers>
  );
}

export default MyApp;
