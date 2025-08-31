'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@repo/ui/tabs';
import { MonitorsTab } from './tabs/MonitorsTab';
import { AlertsTab } from './tabs/AlertsTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { SettingsTab } from './tabs/SettingsTab';

export function DashboardTabs() {
  return (
    <Tabs defaultValue="monitors" className="w-full mb-10">
      {/* <TabsList className="grid w-full grid-cols-4 bg-bg-800 border border-white/10">
        <TabsTrigger value="monitors" className="data-[state=active]:bg-accent-ice/10 data-[state=active]:text-accent-ice">
          Monitors
        </TabsTrigger>
        <TabsTrigger value="alerts" className="data-[state=active]:bg-accent-ice/10 data-[state=active]:text-accent-ice">
          Alerts
        </TabsTrigger>
        <TabsTrigger value="analytics" className="data-[state=active]:bg-accent-ice/10 data-[state=active]:text-accent-ice">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="settings" className="data-[state=active]:bg-accent-ice/10 data-[state=active]:text-accent-ice">
          Settings
        </TabsTrigger>
      </TabsList> */}

      <TabsContent value="monitors" className="mt-6">
        <MonitorsTab />
      </TabsContent>

      <TabsContent value="alerts" className="mt-6">
        <AlertsTab />
      </TabsContent>

      <TabsContent value="analytics" className="mt-6">
        <AnalyticsTab />
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
}