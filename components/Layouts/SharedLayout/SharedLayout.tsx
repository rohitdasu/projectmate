import { FC, useState, useEffect } from 'react';
import { SharedLayoutProps } from './SharedLayout.interface';
import Head from 'next/head';
import { Sidebar } from '../Sidebar';
import { BottomBar } from '../BottomBar';
import { TopNavbar } from '../TopNavbar';

export const SharedLayout: FC<SharedLayoutProps> = ({
  title = '',
  children,
  leftSidebar = true,
  rightSidebar = false,
}) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = prevScrollPos < currentScrollPos;

      setIsNavbarVisible(!isScrollingDown);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Head>
        <title>{`${title} | Projectmate`}</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <nav
        className={`sticky z-10 block overflow-hidden border-b border-gray-200 bg-white transition-all dark:border-gray-900 dark:bg-gray-800 md:hidden ${
          isNavbarVisible ? 'top-0' : '-top-14'
        }`}
      >
        <TopNavbar />
      </nav>
      <div className="grid min-h-screen grid-cols-4">
        {leftSidebar && (
          <div className="hidden grid-cols-1 lg:block">
            <Sidebar />
          </div>
        )}
        <main
          className={`col-span-4 mx-auto w-full max-w-2xl ${
            leftSidebar ? 'lg:col-span-2' : 'lg:col-span-4'
          }`}
        >
          {children}
        </main>
        {rightSidebar && <div></div>}
      </div>
      <div className="sticky bottom-0 z-10 block h-14 w-full border-t border-gray-200 bg-white dark:border-gray-900 dark:bg-gray-800 md:hidden">
        <BottomBar />
      </div>
    </div>
  );
};
