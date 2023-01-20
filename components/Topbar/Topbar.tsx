import React from 'react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';
import { DesktopRoutes } from './DesktopRoutes';
import { Sidebar } from './Sidebar';
import { Logo } from './Logo';
import { Avatar } from '../Avatar';
import { LoginButton } from './LoginButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { openModal } from '@/store/slices/sliceModal';
import { useAppDispatch } from '../../app/hooks';
import { BuyMeACoffee } from '../BuyMeACoffee';
import { ProductHunt } from '../ProductHunt';

export const Topbar = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const gotoSubmitPage = () => {
    if (!session) {
      dispatch(openModal());
    } else {
      router.push('/projects/submit');
    }
  };
  const SUBMIT_PAGE = '/projects/submit';
  return (
    <div className="bg-background-1 text-foreground-1">
      <nav className="m-auto flex h-[5.46rem] max-w-screen-xl justify-between p-4 py-5">
        <div className="flex items-center gap-10">
          <Logo />
          {router.pathname !== '/' && <DesktopRoutes />}
        </div>
        <div className="flex items-center gap-2">
          {router.pathname === '/' && <BuyMeACoffee />}
          {router.pathname !== SUBMIT_PAGE && router.pathname !== '/' && (
            <button
              className="hidden h-[2.939rem] w-40 rounded-md !bg-transparent text-gray-500 shadow-border-shadow transition-all hover:border-2 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 md:block"
              onClick={gotoSubmitPage}
            >
              Submit Project
            </button>
          )}
          {router.pathname === '/' && <ProductHunt />}
          <ThemeToggler />
          <LoginButton />
          <Sidebar />
          <Avatar />
        </div>
      </nav>
    </div>
  );
};
