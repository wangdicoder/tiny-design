import type { Metadata } from 'next';
import { ThemeScript } from '../components/theme-script';
import { SiteHeader } from '../components/layout/site-header';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Tiny Design Pro',
  description: 'Beautiful, ready-to-use UI blocks built with Tiny Design components.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeScript />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
