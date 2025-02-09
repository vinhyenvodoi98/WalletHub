import {usePrivy} from '@privy-io/react-auth';

import { shortenAddress } from '@/utils/addresses';

export default function LoginButton() {
  const {ready, authenticated, login, user} = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  if (authenticated && user?.wallet?.address) {
    return (
      <div className="text-xl font-bold px-6 py-2 bg-blue-500 rounded-full">
        {shortenAddress(user.wallet.address)}
      </div>
    );
  }

  return (
    <button
      className='text-xl font-bold px-6 py-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all hover:scale-105' 
      disabled={disableLogin}
      onClick={login}
    >
      Log in
    </button>
  );
}