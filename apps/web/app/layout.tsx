import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { TRPCProvider } from '../lib/trpc/provider';
import '../styles/globals.css';

export const metadata = {
  title: 'Charlie Armstrong - CharlieArmstrongDev',
  description: 'Charlie Armstrong\'s professional portfolio and developer website.',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <TRPCProvider>
            <div className="flex flex-col min-h-screen">
              <header>
                {/* Header component can be imported and used here */}
              </header>
              <main className="flex-grow">
                {children}
              </main>
              <footer>
                {/* Footer component can be imported and used here */}
              </footer>
            </div>
          </TRPCProvider>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default Layout;