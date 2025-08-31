'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { DashboardTabs } from '../../components/dashboard/DashboardTabs';
import { DashboardOverview } from '../../components/dashboard/DashboardOverview';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-100 mb-2">Dashboard</h1>
            <p className="text-muted-400">
              Monitor your services and track performance metrics.
            </p>
          </div>

          <DashboardTabs />
          <DashboardOverview/>
        </div>
      </main>
      <Footer />
    </div>
  );
}