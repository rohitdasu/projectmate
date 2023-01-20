import Head from 'next/head';
import React from 'react';
import { AuthModal } from '@/components/AuthModal';
import { Topbar } from '../Topbar/Topbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSocialLinks } from '../Topbar/data';

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
  const socialLinks = getSocialLinks();
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
          <div className="flex flex-col items-center justify-center rounded-full p-5">
            <div className="flex flex-row items-center justify-center space-x-16">
              {socialLinks.map(({ Icon, title, anchorTagProps, url }) => (
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  key={title}
                  {...anchorTagProps}
                  href={url}
                  className="flex items-center justify-center text-3xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {<Icon />}
                </motion.a>
              ))}
            </div>
          </div>
          <ul className="my-4 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-8">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
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
