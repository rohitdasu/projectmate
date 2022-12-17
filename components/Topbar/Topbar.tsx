import React from 'react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';
import { DesktopRoutes } from './DesktopRoutes';
import { Sidebar } from './Sidebar';
import { Logo } from './Logo';
import { Avatar } from '../Avatar';
import { SocialLinks } from './SocialLinks';
import { Button } from '../Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toastMessage, messageType } from '../../shared';

export const Topbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const gotoSubmitPage = () => {
    if (!session) {
      toastMessage('Please login/register first', messageType.error);
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
          {router.pathname !== SUBMIT_PAGE && router.pathname !== '/' && (
            <Button
              className="hidden px-5 py-3 md:block"
              onClick={gotoSubmitPage}
              isDisabled={false}
            >
              Submit Project
            </Button>
          )}
          <ThemeToggler />
          <SocialLinks />
          <Sidebar />
          <Avatar />
        </div>
      </nav>
    </div>
  );
};
