'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Metrics = {
  totalMonitors: number;
  averageUptime: number | null;
  activeAlerts: number;
  averageResponseTime: number;
  servicesOnline: number;
  totalChecks: number;
};

export function DashboardOverview() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalMonitors: 0,
    averageUptime: null,
    activeAlerts: 0,
    averageResponseTime: 0,
    servicesOnline: 0,
    totalChecks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchMetrics() {
      try {
        setLoading(true);
        const res = await axios.get('/api/getDashboardList');
        if (!mounted) return;

        setMetrics({
          totalMonitors: Number(res.data.totalMonitors ?? 0),
          averageUptime: res.data.averageUptime === null ? null : Number(res.data.averageUptime ?? 0),
          activeAlerts: Number(res.data.activeAlerts ?? 0),
          averageResponseTime: Number(res.data.averageResponseTime ?? 0),
          servicesOnline: Number(res.data.servicesOnline ?? 0),
          totalChecks: Number(res.data.totalChecks ?? 0)
        });
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard metrics', err);
        if (!mounted) return;
        setError('Failed to load metrics');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchMetrics();
    return () => { mounted = false; };
  }, []);

  // display formatting
  const avgUptimeDisplay =
    typeof metrics.averageUptime === 'number' ? `${metrics.averageUptime.toFixed(2)}%` : '—';
  const avgResponseTimeDisplay = `${Math.round(metrics.averageResponseTime)}ms`;
  const servicesOnlineDisplay = `${metrics.servicesOnline}/${metrics.totalMonitors}`;
  const totalChecksDisplay = metrics.totalChecks.toLocaleString();

  // labels & values shown horizontally (one header row, one value row)
  const labels = [
    'Total Monitors',
    'Avg Uptime',
    'Active Alerts',
    'Avg Response Time',
    'Services Online',
    'Total Checks'
  ];

  const values = [
    loading ? 'Loading…' : metrics.totalMonitors,
    loading ? 'Loading…' : avgUptimeDisplay,
    loading ? 'Loading…' : metrics.activeAlerts,
    loading ? 'Loading…' : avgResponseTimeDisplay,
    loading ? 'Loading…' : servicesOnlineDisplay,
    loading ? 'Loading…' : totalChecksDisplay
  ];

  return (
    <div className="overflow-x-auto bg-bg-800 rounded-card border border-white/10 p-4">
      {error && <div className="text-sm text-red-400 mb-2">{error}</div>}

      <table className="min-w-max w-full">
        <thead>
          <tr className="border-b border-white/10">
            {labels.map(label => (
              <th
                key={label}
                className="text-left py-3 px-4 text-sm font-medium text-muted-400 whitespace-nowrap"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            {values.map((val, i) => (
              <td key={i} className="py-3 px-4 text-sm font-medium text-text-100 whitespace-nowrap">
                {val}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
