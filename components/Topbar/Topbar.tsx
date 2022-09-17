import React from 'react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';
import { DesktopRoutes } from './DesktopRoutes';
import { Logo } from './Logo';

export const Topbar = () => {
  return (
    <div className="bg-background-1 text-foreground-1">
      <nav className="container flex justify-between p-2 py-5 m-auto md:p-5">
        <div className="flex items-center gap-10">
          <Logo />
          <DesktopRoutes />
        </div>
        <ThemeToggler />
      </nav>
    </div>
  );
};
