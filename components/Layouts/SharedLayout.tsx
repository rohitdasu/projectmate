import Head from 'next/head';
import React from 'react';
import { Topbar } from '../Topbar/Topbar';
import { BackToTop } from '../BackToTopButton/BackToTop';

interface IProps {
  children: React.ReactNode;
  title: string;
  hideFooter?: boolean;
  hasContainer?: boolean;
}

export const SharedLayout: React.FC<IProps> = ({
  children,
  title,
  hideFooter,
  hasContainer,
}) => {
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>{`Projectmate | ${title}`}</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Topbar />
      <main className={(hasContainer && 'm-auto max-w-screen-xl') || ''}>
        {children}
      </main>
      <BackToTop />
      {!hideFooter && (
        <footer className="z-100 sticky top-[100%] border-t px-5 py-10 text-center dark:border-gray-800">
          This project is published under{' '}
          <a
            className="font-bold underline"
            href="https://github.com/rohitdasu/projectmate/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            MIT License
          </a>{' '}
          © {year}
        </footer>
      )}
    </>
  );
};
