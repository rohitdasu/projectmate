import React, { FC } from 'react';
import { SharedLayoutProps } from './SharedLayout.interface';
import Head from 'next/head';

export const SharedLayout: FC<SharedLayoutProps> = ({
  title = '',
  children,
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Head>
        <title>{`${title} | Projectmate`}</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
};
