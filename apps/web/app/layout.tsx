import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google';
import { AccessibilityProvider } from '../providers/AccessibilityProvider'
import { MockDataProvider } from '../providers/MockDataProvider'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UpTime - Website & API Monitoring Made Simple',
  description: 'Monitor your websites and APIs with real-time alerts, detailed analytics, and beautiful status pages. Get notified instantly when your services go down.',
  keywords: 'uptime monitoring, website monitoring, API monitoring, server monitoring, alerts',
  openGraph: {
    title: 'UpTime - Website & API Monitoring Made Simple',
    description: 'Monitor your websites and APIs with real-time alerts, detailed analytics, and beautiful status pages.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AccessibilityProvider>
             <MockDataProvider>
              {children}
             </MockDataProvider>
          </AccessibilityProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}