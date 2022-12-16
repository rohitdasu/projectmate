import React from 'react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';
import { DesktopRoutes } from './DesktopRoutes';
import { Sidebar } from './Sidebar';
import { Logo } from './Logo';
import { Avatar } from '../Avatar';
import { SocialLinks } from './SocialLinks';
import { Button } from '../Button';
import { MdPostAdd } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toastMessage, messageType } from '../../shared';

export const Topbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const gotoSubmitPage = () => {
    if (!session) {
      toastMessage('please login/register first', messageType.error);
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
          <DesktopRoutes />
        </div>
        <div className="flex items-center gap-2">
          {router.pathname !== SUBMIT_PAGE && (
            <Button
              className="hidden items-center gap-1 px-5 py-3 md:flex"
              onClick={gotoSubmitPage}
              isDisabled={false}
            >
              <MdPostAdd className="text-2xl" />
              <p>Submit</p>
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
