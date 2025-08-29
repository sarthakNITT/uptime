'use client';

import { Suspense, lazy } from 'react';
import { useMockData } from '../../../providers/MockDataProvider';

const UptimeChart = lazy(() => import('../../../components/charts/UptimeChart'));

export function AnalyticsTab() {
  const { monitors, checks } = useMockData();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-800 rounded-card p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-text-100 mb-4">Uptime Trends</h3>
          <Suspense fallback={<div className="h-64 bg-bg-900/50 rounded-md animate-pulse" />}>
            <UptimeChart />
          </Suspense>
        </div>
        
        <div className="bg-bg-800 rounded-card p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-text-100 mb-4">Response Time Distribution</h3>
          <div className="h-64 flex items-center justify-center text-muted-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-bg-900/50 rounded-full flex items-center justify-center mb-4 mx-auto">
                📊
              </div>
              <p className="text-sm">Response time chart will load here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}