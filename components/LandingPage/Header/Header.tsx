import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="font-lato text-xl font-medium uppercase md:text-2xl">
        project<span className="text-primary-color">mate</span>
      </h1>
    </Link>
  );
};

export const Header = () => {
  return (
    <nav className="mx-auto flex h-20 w-full max-w-screen-xl flex-row items-center justify-between px-4">
      <Logo />
    </nav>
  );
};
