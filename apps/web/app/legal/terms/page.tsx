import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-text-100 mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-bg-800 rounded-card p-8 border border-white/10 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-text-100 mb-4">Acceptance of Terms</h2>
                <p className="text-muted-400 leading-relaxed">
                  By accessing and using UpTime&apos;s monitoring services, you accept and agree to be bound 
                  by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-100 mb-4">Use License</h2>
                <p className="text-muted-400 leading-relaxed">
                  Permission is granted to temporarily download one copy of UpTime&apos;s materials for 
                  personal, non-commercial transitory viewing only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-100 mb-4">Service Availability</h2>
                <p className="text-muted-400 leading-relaxed">
                  We strive to provide 99.9% uptime for our monitoring services. However, we do not 
                  guarantee uninterrupted service and reserve the right to perform maintenance.
                </p>
              </section>

              <div className="border-t border-white/10 pt-6">
                <p className="text-sm text-muted-400">
                  Last updated: January 29, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}