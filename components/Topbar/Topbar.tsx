import React from 'react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';
import { DesktopRoutes } from './DesktopRoutes';
import { Sidebar } from './Sidebar';
import { Logo } from './Logo';
import { Avatar } from '../Avatar';

export const Topbar = () => {
  return (
    <div className="bg-background-1 text-foreground-1">
      <nav className="flex max-w-screen-xl justify-between p-4 py-5 m-auto h-[5.46rem]">
        <div className="flex items-center gap-10">
          <Logo />
          <DesktopRoutes />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggler />
          <Sidebar />
          <Avatar />
        </div>
      </nav>
    </div>
  );
};
