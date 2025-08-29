import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-text-100 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-bg-800 rounded-card p-8 border border-white/10 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-text-100 mb-4">Information We Collect</h2>
                <p className="text-muted-400 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, 
                  configure monitoring services, or contact us for support.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-100 mb-4">How We Use Your Information</h2>
                <p className="text-muted-400 leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our monitoring services, 
                  send you alerts about your monitored services, and communicate with you about our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-100 mb-4">Data Security</h2>
                <p className="text-muted-400 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction.
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