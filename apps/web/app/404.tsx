import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-6xl font-bold text-accent-ice mb-4">404</h1>
          <h2 className="text-2xl font-bold text-text-100 mb-4">Page Not Found</h2>
          <p className="text-muted-400 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to a different location.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 bg-accent-ice text-bg-900 px-6 py-3 rounded-btn font-medium hover:bg-accent-ice/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 border border-white/20 text-text-100 px-6 py-3 rounded-btn font-medium hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}