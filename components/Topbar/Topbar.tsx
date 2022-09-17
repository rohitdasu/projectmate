import React from 'react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';

export const Topbar = () => {
  return (
    <div className="bg-background-1 text-foreground-1">
      <nav className="container p-5 m-auto">
        <h1>hello</h1>
        <ThemeToggler />
      </nav>
    </div>
  );
};
