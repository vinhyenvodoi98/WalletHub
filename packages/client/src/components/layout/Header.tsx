import Link from 'next/link';

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
            <button className="text-xl font-bold px-6 py-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all hover:scale-105">
              Connect
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
