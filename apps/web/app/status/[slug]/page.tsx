'use client';

import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { StatusPageDisplay } from '../../../components/status/StatusPageDisplay';

interface StatusPageProps {
  params: {
    slug: string;
  };
}

export default function StatusPage({ params }: StatusPageProps) {
  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24">
        <StatusPageDisplay slug={params.slug} />
      </main>
      <Footer />
    </div>
  );
}