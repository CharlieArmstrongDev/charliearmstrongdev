import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { trpc } from '../lib/trpc/provider';
import '../styles/globals.css';

export const metadata = {
  title: 'Charlie Armstrong - CharlieArmstrongDev',
  description: 'Charlie Armstrong\'s professional portfolio and developer website.',
};

const Layout = ({ children }) => {
  return (
    <ClerkProvider>
      <trpc.Provider>
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
      </trpc.Provider>
    </ClerkProvider>
  );
};

export default Layout;