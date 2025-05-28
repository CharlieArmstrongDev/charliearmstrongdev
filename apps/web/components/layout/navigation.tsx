import React from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-white hover:text-gray-300">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/projects" className="text-white hover:text-gray-300">
            Projects
          </Link>
        </li>
        <li>
          <Link href="/sign-in" className="text-white hover:text-gray-300">
            Sign In
          </Link>
        </li>
        <li>
          <Link href="/sign-up" className="text-white hover:text-gray-300">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
