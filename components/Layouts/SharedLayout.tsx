import Head from 'next/head';
import React from 'react';
import { AuthModal } from '@/components/AuthModal';
import { Topbar } from '../Topbar/Topbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSocialLinks } from '../Topbar/data';
import { ISharedLayout } from './Layouts.interface';
import { Tooltip } from '../Tooltip';

export const SharedLayout: React.FC<ISharedLayout> = ({
  children,
  title,
  showFooter = false,
  hasContainer,
}) => {
  const year = new Date().getFullYear();
  const socialLinks = getSocialLinks();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Head>
        <title>{`Projectmate | ${title}`}</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Topbar />
      <main className="flex-1 bg-gray-900">
        <div className={(hasContainer && 'm-auto max-w-screen-xl') || ''}>
          {children}
        </div>
      </main>
      <AuthModal title={'Continue with your social accounts'} />
      {showFooter && (
        <footer className="z-100 sticky top-[100%] border-t border-gray-800 bg-gray-900 px-5 py-10 text-center">
          <div className="flex flex-col items-center justify-center rounded-full p-5">
            <ul className="flex flex-row items-center justify-center space-x-16">
              {socialLinks.map(({ Icon, title, anchorTagProps, url }) => (
                <li key={title} className="flex items-center justify-center">
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    {...anchorTagProps}
                    href={url}
                    className="flex items-center justify-center text-3xl text-slate-400 hover:text-slate-100"
                  >
                    <span className="sr-only">
                      Projectmate on {title.toLowerCase()}
                    </span>
                    <Tooltip text={title} direction="top">
                      {<Icon />}
                    </Tooltip>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          <ul className="my-4 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-8">
            <li>
              <Link
                href="/privacy-policy"
                className="text-base font-extralight hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
          <a
            className="font-semibold hover:underline"
            href="https://github.com/rohitdasu/projectmate/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            MIT License {year}
          </a>
        </footer>
      )}
    </div>
  );
};
