import { FC, useState, useEffect } from 'react';
import { SharedLayoutProps } from './SharedLayout.interface';
import Head from 'next/head';
import { Sidebar } from '../Sidebar';
import { BottomBar } from '../BottomBar';
import { TopNavbar } from '../TopNavbar';
import { favicons } from '@/data';
import BackToTopButton from '@/components/Common/BackToTop';
import RightBar from '../RightBar';

export const SharedLayout: FC<SharedLayoutProps> = ({
  title = '',
  children,
  leftSidebar = true,
  rightSidebar = true,
  topBar = true,
  bottomBar = true,
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
    <div className="flex min-h-dvh w-full flex-col">
      <Head>
        <title>{`${title} | Projectmate`}</title>
        {favicons.map((favicon, index) => (
          <link key={index} {...favicon} />
        ))}
      </Head>
      {topBar && (
        <nav
          className={`sticky z-10 block overflow-hidden border-b bg-white/60 transition-all dark:bg-black/60 lg:hidden ${
            isNavbarVisible ? 'top-0' : '-top-14'
          }`}
        >
          <TopNavbar />
        </nav>
      )}
      <div className="grid min-h-dvh grid-cols-4">
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
        {rightSidebar && (
          <div className="grid min-h-dvh grid-cols-4">
            <RightBar />
          </div>
        )}
      </div>
      {bottomBar && (
        <div className="sticky bottom-0 z-10 block h-14 w-full border-t bg-white/60 dark:bg-black/60 lg:hidden">
          <BottomBar />
        </div>
      )}
      <BackToTopButton />
    </div>
  );
};
