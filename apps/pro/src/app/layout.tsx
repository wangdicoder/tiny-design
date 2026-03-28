import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { ThemeScript } from '../components/theme-script';
import { SiteHeader } from '../components/layout/site-header';
import './globals.scss';

const heading = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Tiny Design Pro',
  description: 'Beautiful, ready-to-use UI blocks built with Tiny Design components.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <ThemeScript />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
