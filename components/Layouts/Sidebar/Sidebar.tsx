import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionCard } from './SessionCard';
import { SessionLessCard } from './SessionLessCard';
import { NavRoutes } from './data';
import { useAuthModal } from '@/hooks/useAuthModal';
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
import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';

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
    <div className="sticky top-0 z-10 flex h-dvh flex-col items-start px-5 py-7 xl:px-7">
      <Logo route={'/'} />
      <ul className="mt-14 flex w-full flex-col items-stretch gap-2">
        {NavElements.map((nav) => {
          if (nav.authGuard && status === 'unauthenticated') {
            return;
          }

          const isActive =
            router.pathname === nav.link ||
            router.pathname === nav.link + '/[username]';

          let spanNameTag = (
            <span className="text-gray-600 group-hover:text-[#0044ff]">
              {nav.name}
            </span>
          );

          if (isActive) {
            spanNameTag = <span className="text-[#0044ff]">{nav.name}</span>;
          }
          // eslint-disable-next-line consistent-return
          return (
            <Link key={nav.id} href={handleNavLink(nav)}>
              <div
                className={`group flex h-11 items-center gap-3 border-2 px-3 font-display text-sm font-bold uppercase transition-colors ${
                  isActive
                    ? 'border-[#0f0f0f] bg-[#eaf0ff] shadow-[3px_3px_0_0_#0044ff]'
                    : 'border-transparent hover:border-[#0f0f0f] hover:bg-white'
                }`}
              >
                <section
                  className={`transition-all ${
                    isActive
                      ? 'text-[#0044ff]'
                      : 'text-gray-500 group-hover:text-[#0044ff]'
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
          <Button
            size="lg"
            className="h-12 w-full rounded-none border-2 border-[#0f0f0f] bg-[#0044ff] font-display text-xs font-bold uppercase text-white shadow-[4px_4px_0_0_#0f0f0f] hover:translate-x-1 hover:translate-y-1 hover:bg-[#0f0f0f] hover:shadow-none"
          >
            {BUTTON_TEXT.addProject}
          </Button>
        </li>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="flex items-center gap-1 text-xs font-semibold text-gray-500">
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
      <ul className="mt-auto flex w-full flex-col items-start gap-4 border-t-2 border-[#0f0f0f] pt-5 transition-all">
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
        <Button
          variant="secondary"
          size="icon"
          className="rounded-none border-2 border-[#0f0f0f] bg-white"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{BUTTON_TEXT.toggleTheme}</span>
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
