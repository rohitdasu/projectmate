import Head from 'next/head';
import React from 'react';
import { AuthModal } from '@/components/AuthModal';
import { Topbar } from '../Topbar/Topbar';
import Link from 'next/link';

interface IProps {
  children: React.ReactNode;
  title: string;
  hideFooter?: boolean;
  hasContainer?: boolean;
}

export const SharedLayout: React.FC<IProps> = ({
  children,
  title,
  hideFooter = true,
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
      <AuthModal title={'Continue with your social accounts'} />
      {!hideFooter && (
        <footer className="z-100 sticky top-[100%] border-t px-5 py-10 text-center dark:border-gray-800">
          <ul className="my-4 flex items-center justify-center gap-8">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Terms and Conditions</Link>
            </li>
          </ul>{' '}
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
