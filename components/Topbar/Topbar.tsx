import Link from 'next/link';
import React from 'react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';

export const Topbar = () => {
  return (
    <div className="bg-background-1 text-foreground-1">
      <nav className="container flex justify-between p-5 m-auto">
        <Logo />
        <ThemeToggler />
      </nav>
    </div>
  );
};

const Logo = () => {
  return (
    <Link href="/">
      <span className="flex items-center font-mono text-2xl font-semibold uppercase cursor-pointer md:space-x-2 text-foreground-1">
        <p>
          project<span className="text-primary-color">mate</span>
        </p>
      </span>
    </Link>
  );
};
