import React, { FC } from 'react';
import { SharedLayoutProps } from './SharedLayout.interface';
import Head from 'next/head';
import { Sidebar } from '../Sidebar';

export const SharedLayout: FC<SharedLayoutProps> = ({
  title = '',
  children,
  leftSidebar = true,
  rightSidebar = false,
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Head>
        <title>{`${title} | Projectmate`}</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="grid min-h-screen grid-cols-9 lg:grid-cols-4">
        {leftSidebar && (
          <div>
            <Sidebar />
          </div>
        )}
        <main className="col-span-8 mx-auto max-w-2xl lg:col-span-2">
          {children}
        </main>
        {rightSidebar && <div></div>}
      </div>
    </div>
  );
};
