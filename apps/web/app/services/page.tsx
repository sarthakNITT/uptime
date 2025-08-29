'use client';

import { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { MonitorForm } from '../../components/monitors/MonitorForm';
import { MonitorList } from '../../components/monitors/MonitorList';
import { Plus } from 'lucide-react';

export default function ServicesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-100 mb-2">Monitor Services</h1>
              <p className="text-muted-400">
                Add and manage your website and API monitors from here.
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-accent-ice text-black text-[12px] px-4 py-2 rounded-btn font-medium hover:bg-accent-ice/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Monitor</span>
            </button>
          </div>

          {/* Monitor Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-bg-800 rounded-card p-6 w-full max-w-md border border-white/10">
                <MonitorForm onClose={() => setShowForm(false)} />
              </div>
            </div>
          )}

          {/* Monitors List */}
          <MonitorList />
        </div>
      </main>
      <Footer />
    </div>
  );
}