import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { TRPCProvider } from '../lib/trpc/provider';
import '../styles/globals.css';

export const metadata = {
  title: 'Charlie Armstrong - CharlieArmstrongDev',
  description:
    "Charlie Armstrong's professional portfolio and developer website.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <TRPCProvider>
            <div className="flex min-h-screen flex-col">
              <header>
                {/* Header component can be imported and used here */}
              </header>
              <main className="grow">{children}</main>
              <footer>
                {/* Footer component can be imported and used here */}
              </footer>
            </div>
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
