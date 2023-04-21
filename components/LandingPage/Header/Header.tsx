import React, { FC } from 'react';
import Link from 'next/link';

interface LogoProps {
  route: string;
}

export const Logo: FC<LogoProps> = ({ route }) => {
  return (
    <Link href={route}>
      <h1 className="font-lato text-xl font-medium uppercase md:text-2xl">
        project<span className="text-primary-color">mate</span>
      </h1>
    </Link>
  );
};

interface HeaderProps {
  homeRoute?: string;
}

export const Header: FC<HeaderProps> = ({ homeRoute = '/' }) => {
  return (
    <nav className="mx-auto flex h-20 w-full max-w-screen-xl flex-row items-center justify-between px-4">
      <Logo route={homeRoute} />
    </nav>
  );
};
