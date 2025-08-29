'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Monitor {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down' | 'paused';
  interval: number;
  createdAt: string;
  uptime30d: number;
  lastChecked: string;
  responseTime: number;
  sslExpiry?: string;
  region: string;
}

export interface Check {
  id: string;
  monitorId: string;
  timestamp: string;
  statusCode: number;
  responseTime: number;
  status: 'up' | 'down';
  region: string;
}

export interface Alert {
  id: string;
  monitorId: string;
  type: 'downtime' | 'ssl' | 'response_time';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  severity: 'critical' | 'warning' | 'info';
}

export interface StatusPage {
  id: string;
  name: string;
  slug: string;
  description: string;
  monitors: string[];
  isPublic: boolean;
  customDomain?: string;
}

interface MockDataContextType {
  monitors: Monitor[];
  checks: Check[];
  alerts: Alert[];
  statusPages: StatusPage[];
  createMonitor: (monitor: Omit<Monitor, 'id' | 'createdAt'>) => void;
  updateMonitor: (id: string, updates: Partial<Monitor>) => void;
  deleteMonitor: (id: string) => void;
  addCheck: (check: Omit<Check, 'id' | 'timestamp'>) => void;
  acknowledgeAlert: (id: string) => void;
  createStatusPage: (statusPage: Omit<StatusPage, 'id'>) => void;
  loading: boolean;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [checks, setChecks] = useState<Check[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [statusPages, setStatusPages] = useState<StatusPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        const existingMonitors = localStorage.getItem('uptime_monitors');
        const existingChecks = localStorage.getItem('uptime_checks');
        const existingAlerts = localStorage.getItem('uptime_alerts');
        const existingStatusPages = localStorage.getItem('uptime_statuspages');

        if (existingMonitors && existingChecks && existingAlerts && existingStatusPages) {
          setMonitors(JSON.parse(existingMonitors));
          setChecks(JSON.parse(existingChecks));
          setAlerts(JSON.parse(existingAlerts));
          setStatusPages(JSON.parse(existingStatusPages));
        } else {
          const [monitorsRes, checksRes, alertsRes, statusPagesRes] = await Promise.all([
            fetch('/mocks/monitors.json'),
            fetch('/mocks/checks.json'),
            fetch('/mocks/alerts.json'),
            fetch('/mocks/statuspages.json'),
          ]);

          const monitorsData = await monitorsRes.json();
          const checksData = await checksRes.json();
          const alertsData = await alertsRes.json();
          const statusPagesData = await statusPagesRes.json();

          setMonitors(monitorsData);
          setChecks(checksData);
          setAlerts(alertsData);
          setStatusPages(statusPagesData);

          localStorage.setItem('uptime_monitors', JSON.stringify(monitorsData));
          localStorage.setItem('uptime_checks', JSON.stringify(checksData));
          localStorage.setItem('uptime_alerts', JSON.stringify(alertsData));
          localStorage.setItem('uptime_statuspages', JSON.stringify(statusPagesData));
        }
      } catch (error) {
        console.error('Failed to load mock data:', error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('uptime_monitors', JSON.stringify(monitors));
    }
  }, [monitors, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('uptime_checks', JSON.stringify(checks));
    }
  }, [checks, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('uptime_alerts', JSON.stringify(alerts));
    }
  }, [alerts, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('uptime_statuspages', JSON.stringify(statusPages));
    }
  }, [statusPages, loading]);

  const createMonitor = (monitorData: Omit<Monitor, 'id' | 'createdAt'>) => {
    const newMonitor: Monitor = {
      ...monitorData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMonitors(prev => [...prev, newMonitor]);
  };

  const updateMonitor = (id: string, updates: Partial<Monitor>) => {
    setMonitors(prev => prev.map(monitor => 
      monitor.id === id ? { ...monitor, ...updates } : monitor
    ));
  };

  const deleteMonitor = (id: string) => {
    setMonitors(prev => prev.filter(monitor => monitor.id !== id));
    setChecks(prev => prev.filter(check => check.monitorId !== id));
    setAlerts(prev => prev.filter(alert => alert.monitorId !== id));
  };

  const addCheck = (checkData: Omit<Check, 'id' | 'timestamp'>) => {
    const newCheck: Check = {
      ...checkData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setChecks(prev => [newCheck, ...prev]);
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const createStatusPage = (statusPageData: Omit<StatusPage, 'id'>) => {
    const newStatusPage: StatusPage = {
      ...statusPageData,
      id: Date.now().toString(),
    };
    setStatusPages(prev => [...prev, newStatusPage]);
  };

  return (
    <MockDataContext.Provider
      value={{
        monitors,
        checks,
        alerts,
        statusPages,
        createMonitor,
        updateMonitor,
        deleteMonitor,
        addCheck,
        acknowledgeAlert,
        createStatusPage,
        loading,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
}