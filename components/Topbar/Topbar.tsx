import Link from 'next/link';
import React from 'react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';
import { appRoutes } from './data';

export const Topbar = () => {
  return (
    <div className="bg-background-1 text-foreground-1">
      <nav className="container flex justify-between p-5 m-auto">
        <div className="flex items-center gap-10">
          <Logo />
          <ul className="hidden gap-5 capitalize md:flex">
            {appRoutes.map((route) => {
              const { title, url, Icon } = route;
              return (
                <li key={title}>
                  <Link href={url}>
                    <a className="flex items-center gap-1">
                      <Icon />
                      {title}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
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
