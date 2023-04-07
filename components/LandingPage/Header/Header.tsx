import React, { FC } from 'react';
import Link from 'next/link';
import { HeaderProps } from './Header.interface';

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="font-lato text-xl font-medium uppercase md:text-2xl">
        project<span className="text-primary-color">mate</span>
      </h1>
    </Link>
  );
};

const AddProduct = () => {
  return (
    <Link href="/projects/submit">
      <button className="rounded-md bg-green-900 px-4 py-2 text-green-50 hover:opacity-90">
        Add product
      </button>
    </Link>
  );
};

export const Header: FC<HeaderProps> = ({ showAddButton }) => {
  return (
    <nav className="mx-auto flex h-20 w-full max-w-screen-xl flex-row items-center justify-between px-4">
      <Logo />
      {showAddButton && <AddProduct />}
    </nav>
  );
};
