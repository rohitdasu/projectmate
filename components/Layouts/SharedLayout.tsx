import Head from 'next/head';
import React from 'react';
import { Topbar } from '../Topbar/Topbar';

interface IProps {
  children: React.ReactNode;
  title: string;
  hideFooter?: boolean;
}

export const SharedLayout: React.FC<IProps> = ({
  children,
  title,
  hideFooter,
}) => {
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Projectmate | {title}</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Topbar />
      <main className="m-auto max-w-screen-xl">{children}</main>
      {!hideFooter && (
        <footer className="sticky top-[100%] px-5 py-10 text-center ">
          Copyright {year} © All Rights Reserved
        </footer>
      )}
    </>
  );
};
