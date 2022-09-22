import Head from 'next/head';
import React from 'react';
import { Topbar } from '../Topbar/Topbar';

interface IProps {
  children: React.ReactNode;
  title: string;
}

export const SharedLayout: React.FC<IProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Projectmate | {title}</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Topbar />
      <main className="max-w-screen-xl m-auto">{children}</main>
    </>
  );
};
