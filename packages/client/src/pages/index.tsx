import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white">
      <div className="container mx-auto px-4">

        <main className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h2 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Manage Your Crypto Wallets
          </h2>

          <p className="text-2xl mb-12 text-gray-300 max-w-2xl">
            Create, manage, and track your wallets in one secure place.
            The simplest way to handle your digital assets.
          </p>

          <Link
            href="/app"
            className="text-2xl font-bold px-12 py-6 bg-blue-500 rounded-full hover:bg-blue-600 transition-all hover:scale-105 hover:shadow-xl shadow-blue-500/25"
          >
            Launch App →
          </Link>
        </main>

        <footer className="py-8 text-center text-gray-400">
          Built with ♥️ for the crypto community
        </footer>
      </div>
    </div>
  );
}
