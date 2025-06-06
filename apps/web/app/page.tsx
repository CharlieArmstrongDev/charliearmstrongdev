import React from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import Navigation from '../components/layout/navigation';

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Navigation />
      <main className="grow">
        <h1 className="mt-10 text-center text-4xl font-bold">
          Welcome to CharlieArmstrongDev
        </h1>
        <p className="mt-4 text-center text-lg">
          Showcasing my projects, blog, and more!
        </p>

        {/* Temporary link for Sentry testing */}
        <div className="mt-6 text-center">
          <a
            href="/test-error"
            className="inline-block rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            🧪 Test Sentry Integration
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
