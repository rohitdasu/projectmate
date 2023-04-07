import React, { FC } from 'react';
import { SharedLayoutProps } from './SharedLayout.interface';
import classNames from 'classnames';
import Head from 'next/head';
import { Header, Footer } from '@/components';

export const SharedLayout: FC<SharedLayoutProps> = ({
  children,
  title = '',
  showFooter = false,
  hasContainer = true,
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Head>
        <title>{`${title} | Projectmate`}</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Header />
      <main className="flex-1">
        <div className={classNames(hasContainer && 'm-auto max-w-screen-xl')}>
          {children}
        </div>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
