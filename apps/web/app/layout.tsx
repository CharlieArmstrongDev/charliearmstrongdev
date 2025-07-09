import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { TRPCProvider } from '../lib/trpc/provider';
import ErrorBoundary from '../components/ui/error-boundary';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import '../styles/globals.css';
import GoogleAnalytics from './GoogleAnalytics';
import LogRocketInit from './LogRocketInit';

export const metadata = {
  title: 'Charlie Armstrong - CharlieArmstrongDev',
  description:
    "Charlie Armstrong's professional portfolio and developer website.",
  keywords:
    'Charlie Armstrong, web developer, portfolio, Next.js, React, TypeScript',
  authors: [{ name: 'Charlie Armstrong' }],
  creator: 'Charlie Armstrong',
  publisher: 'Charlie Armstrong',
  metadataBase: new URL('https://charliearmstrong.dev'),
  openGraph: {
    title: 'Charlie Armstrong - CharlieArmstrongDev',
    description:
      "Charlie Armstrong's professional portfolio and developer website.",
    url: 'https://charliearmstrong.dev',
    siteName: 'CharlieArmstrongDev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlie Armstrong - CharlieArmstrongDev',
    description:
      "Charlie Armstrong's professional portfolio and developer website.",
    creator: '@c_arm_dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* Google Analytics */}
          <GoogleAnalytics />
          {/* LogRocket Initialization */}
          <LogRocketInit />
          <ErrorBoundary>
            <TRPCProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="grow">{children}</main>
                <Footer />
              </div>
            </TRPCProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
