import React from 'react';

const Logo = () => {
  return (
    <h1 className="font-lato text-xl uppercase md:text-2xl">
      project<span className="text-green-400">mate</span>
    </h1>
  );
};

export const Header = () => {
  return (
    <nav className="mx-auto flex h-20 w-full max-w-screen-xl flex-row items-center justify-between px-4 lg:px-0">
      <Logo />
    </nav>
  );
};
