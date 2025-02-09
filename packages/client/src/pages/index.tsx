import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-main bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white">
      <div className="container mx-auto px-4">

        <main className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h2 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Manage Your Crypto Wallets
          </h2>

          <p className="text-2xl mb-12 text-gray-300 max-w-2xl">
            Create, manage, and track your wallets in one secure place.
            The simplest way to handle your digital assets.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
        <Link
            href="/app"
            className="text-2xl font-bold px-12 py-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-105 hover:shadow-xl shadow-lg shadow-blue-500/25 flex items-center justify-center"
          >
            Launch App
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

          <Link
            href="/guide"
            className="text-2xl font-bold px-12 py-6 bg-white text-blue-600 rounded-full hover:bg-gray-50 transition-all hover:scale-105 hover:shadow-xl shadow-lg shadow-gray-200/50 border-2 border-blue-500/20 flex items-center justify-center"
          >
            View Guide
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
        </main>

        <footer className="py-8 text-center text-gray-400">
          Built with ♥️ for the crypto community
        </footer>
      </div>
    </div>
  );
}
