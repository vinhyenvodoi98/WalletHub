import Link from 'next/link';

import LoginButton from '../LoginButton';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full'>
      <div className=''>
        <div className="navbar bg-gradient-to-r from-blue-900 via-black to-purple-900 text-white px-8">
          <div className="navbar-start">
            <Link href="/" className="text-3xl font-bold">WalletHub</Link>
          </div>
          <div className="navbar-center">
            <Link href="/app" className="text-xl font-semibold hover:text-blue-400 transition-colors">
              Manage Wallets
            </Link>
          </div>
          <div className="navbar-end">
            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  );
}
