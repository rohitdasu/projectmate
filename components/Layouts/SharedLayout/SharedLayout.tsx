import { FC } from 'react';
import { SharedLayoutProps } from './SharedLayout.interface';
import Head from 'next/head';
import { Sidebar } from '../Sidebar';
import { BottomBar } from '../BottomBar';

export const SharedLayout: FC<SharedLayoutProps> = ({
  title = '',
  children,
  leftSidebar = true,
  rightSidebar = false,
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Head>
        <title>{`${title} | Projectmate`}</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="grid min-h-screen grid-cols-4">
        {leftSidebar && (
          <div className="hidden grid-cols-1 lg:block">
            <Sidebar />
          </div>
        )}
        <main className="col-span-4 mx-auto max-w-2xl lg:col-span-2">
          {children}
        </main>
        {rightSidebar && <div></div>}
      </div>
      <div className="sticky bottom-0 block h-14 w-full bg-gray-100 md:hidden">
        <BottomBar />
      </div>
    </div>
  );
};
