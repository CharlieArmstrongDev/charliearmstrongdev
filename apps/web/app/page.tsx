import React from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import Navigation from '../components/layout/navigation';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />
      <main className="flex-grow">
        <h1 className="text-4xl font-bold text-center mt-10">Welcome to CharlieArmstrongDev</h1>
        <p className="text-lg text-center mt-4">Showcasing my projects, blog, and more!</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;