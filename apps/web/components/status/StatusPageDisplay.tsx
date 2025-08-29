'use client';

import { useMockData } from '../../providers/MockDataProvider';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface StatusPageDisplayProps {
  slug: string;
}

export function StatusPageDisplay({ slug }: StatusPageDisplayProps) {
  const { statusPages, monitors } = useMockData();
  
  const statusPage = statusPages.find(page => page.slug === slug);
  
  if (!statusPage) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-text-100 mb-4">Status Page Not Found</h1>
        <p className="text-muted-400">The status page you're looking for doesn't exist.</p>
      </div>
    );
  }

  const pageMonitors = monitors.filter(m => statusPage.monitors.includes(m.id));
  const allOnline = pageMonitors.every(m => m.status === 'up');
  const hasIncidents = pageMonitors.some(m => m.status === 'down');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Status Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-100 mb-4">{statusPage.name}</h1>
        <p className="text-muted-400 mb-6">{statusPage.description}</p>
        
        {/* Overall Status */}
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${
          allOnline 
            ? 'bg-green-400/10 border-green-400/20 text-green-400' 
            : hasIncidents 
              ? 'bg-red-400/10 border-red-400/20 text-red-400'
              : 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400'
        }`}>
          {allOnline ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">All Systems Operational</span>
            </>
          ) : hasIncidents ? (
            <>
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Service Disruption</span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4" />
              <span className="font-medium">Partial Outage</span>
            </>
          )}
        </div>
      </div>

      {/* Services Status */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-text-100 mb-6">Service Status</h2>
        
        {pageMonitors.map((monitor) => (
          <div key={monitor.id} className="bg-bg-800 rounded-card p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  monitor.status === 'up' ? 'bg-green-400' : 
                  monitor.status === 'down' ? 'bg-red-400' : 'bg-yellow-400'
                }`}></div>
                <h3 className="text-lg font-medium text-text-100">{monitor.name}</h3>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-100">
                  {monitor.status === 'up' ? 'Operational' : 
                   monitor.status === 'down' ? 'Offline' : 'Degraded'}
                </div>
                <div className="text-xs text-muted-400">
                  {monitor.uptime30d.toFixed(2)}% uptime
                </div>
              </div>
            </div>
            
            {monitor.status === 'down' && (
              <div className="bg-red-400/10 border border-red-400/20 rounded-md p-3">
                <p className="text-sm text-red-400">
                  Service is currently experiencing connectivity issues. Our team is investigating.
                </p>
                <p className="text-xs text-muted-400 mt-1">
                  Started: {new Date(monitor.lastChecked).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent Incidents */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-text-100 mb-6">Recent Incidents</h2>
        <div className="bg-bg-800 rounded-card p-6 border border-white/10 text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <p className="text-text-100 font-medium mb-2">No incidents in the last 30 days</p>
          <p className="text-sm text-muted-400">All services have been running smoothly.</p>
        </div>
      </div>
    </div>
  );
}