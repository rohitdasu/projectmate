import Head from 'next/head';
import React from 'react';
import { Topbar } from '../Topbar/Topbar';

interface IProps {
  children: React.ReactNode;
  title: string;
}

export const SharedLayout: React.FC<IProps> = ({ children, title }) => {
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Projectmate | {title}</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Topbar />
      <main className="m-auto max-w-screen-xl">{children}</main>
      <footer className="px-5 py-10 text-center">
        Copyright {year} © All Rights Reserved
      </footer>
    </>
  );
};
