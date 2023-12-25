import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionCard } from './SessionCard';
import { SessionLessCard } from './SessionLessCard';
import { NavRoutes } from './data';
import { useAuthModal } from '@/hooks/useAuthModal';
import { Separator } from '@/components/ui/separator';
import { Verified, Info, Loader } from 'lucide-react';
import { AddProjectModal } from '@/components/Modals/AddProjectModal';
import { useAddProjectModal } from '@/hooks/useAddProjectModal';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { useAppData } from '@/context/Common/CommonContext';
import { Logo } from '@/components/Common/Logo';

const NavElements = NavRoutes.map((nav) => {
  return {
    id: nav.id,
    icon: nav.icon,
    link: nav.link,
    name: nav.title,
    authGuard: nav.authGuard,
    addUsername: nav.addUsername,
  };
});

export const Sidebar = () => {
  const data = useAppData();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { openModal } = useAuthModal();
  const { openModal: openAddProjectModal } = useAddProjectModal();

  const handleAddProject = () => {
    if (status === 'authenticated') {
      openAddProjectModal();
    } else if (status === 'unauthenticated') {
      openModal();
    } else {
      return;
    }
  };

  const handleNavLink = (nav: { link: string; addUsername?: boolean }) => {
    if (nav.addUsername && data.profileDetails?.results?.username) {
      return `${nav.link}/${data.profileDetails.results.username}`;
    } else {
      return nav.link;
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex h-dvh flex-col items-center px-2 pt-6 md:items-start md:px-8 lg:w-1/4">
      <Logo route={'/'} />
      <ul className="mt-16 flex w-full flex-col items-center justify-center gap-4 md:items-start">
        {NavElements.map((nav) => {
          if (nav.authGuard && status === 'unauthenticated') {
            return;
          }

          const isActive =
            router.pathname === nav.link ||
            router.pathname === nav.link + '/[username]';

          let spanNameTag = (
            <span className="hidden text-gray-600 hover:text-gray-900 lg:block dark:text-gray-400 dark:hover:text-gray-300">
              {nav.name}
            </span>
          );

          if (isActive) {
            spanNameTag = (
              <span className="hidden text-gray-900 lg:block dark:text-gray-300">
                {nav.name}
              </span>
            );
          }
          // eslint-disable-next-line consistent-return
          return (
            <Link key={nav.id} href={handleNavLink(nav)}>
              <div className="flex h-9 items-center justify-center gap-4  md:flex-row md:items-start">
                <section
                  className={`transition-all hover:text-gray-900 dark:hover:text-gray-300 ${
                    isActive && 'text-gray-900 dark:text-gray-300'
                  }`}
                >
                  {React.cloneElement(nav.icon, {
                    strokeWidth: isActive ? 2 : 1,
                  })}
                </section>
                <p>{spanNameTag}</p>
              </div>
            </Link>
          );
        })}
        <AddProjectModal email={session?.user?.email} />
        <li onClick={handleAddProject}>
          <Button size="lg">Add project</Button>
        </li>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                <Info className="inline-block h-4" />
                Become a Gold Member
                <Verified
                  fill="#F87315"
                  className="inline-block h-5 animate-wiggle text-white"
                />
              </p>
            </TooltipTrigger>
            <TooltipContent className="dark:bg-gray-900">
              Add project to become a Gold Member
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ul>
      <ul className="absolute bottom-4 flex w-3/4 flex-col items-start gap-4 transition-all">
        <Separator />
        {status === 'authenticated' ? (
          <div className="flex w-full flex-row items-center justify-between">
            <SessionCard
              email={session?.user?.email || ''}
              name={session?.user?.name || ''}
              image={session?.user?.image || ''}
            />
            <ThemeToggler />
          </div>
        ) : status === 'unauthenticated' ? (
          <div className="flex w-full flex-row items-center justify-between">
            <SessionLessCard />
            <ThemeToggler />
          </div>
        ) : (
          <div>
            <Loader className="animate-spin" />
          </div>
        )}
      </ul>
    </div>
  );
};

export const ThemeToggler = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
