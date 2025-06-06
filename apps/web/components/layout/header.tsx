import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link href="/">CharlieArmstrongDev</Link>
        </h1>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <SignedOut>
              <li>
                <Link href="/sign-in">Sign In</Link>
              </li>
              <li>
                <Link href="/sign-up">Sign Up</Link>
              </li>
            </SignedOut>
            <SignedIn>
              <li>
                <UserButton />
              </li>
            </SignedIn>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
