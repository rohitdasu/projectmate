import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionCard } from './SessionCard';
import { SessionLessCard } from './SessionLessCard';
import { NavRoutes } from './data';
import { useState } from 'react';
import { AuthModal } from '@/components/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Crown, Info, Loader } from 'lucide-react';
import { AddProjectModal } from '@/components/AddProjectModal';
import { useAddProjectModal } from '@/hooks/useAddProjectModal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const NavElements = NavRoutes.map((nav) => {
  return {
    id: nav.id,
    icon: nav.icon,
    link: nav.link,
    name: nav.title,
  };
});

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="font-lato hidden text-xl font-medium uppercase md:text-2xl lg:block">
        projectmate
      </h1>
    </Link>
  );
};

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { openModal } = useAuthModal();
  const { openModal: openAddProjectModal } = useAddProjectModal();
  const message = 'Continue with your social account';
  const [loginMessage, setLoginMessage] = useState(message);

  const handleAddProject = () => {
    if (status === 'authenticated') {
      openAddProjectModal();
    } else {
      setLoginMessage('Login with your account to add project');
      openModal();
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex h-screen flex-col items-center px-2 pt-6 md:items-start md:px-8 lg:w-1/4">
      <Logo />
      <ul className="mt-16 flex w-full flex-col items-center justify-center gap-4 md:items-start">
        {NavElements.map((nav) => {
          const isActive = router.pathname === nav.link;

          let spanNameTag = (
            <span className="hidden text-gray-600 hover:text-gray-900 lg:block">
              {nav.name}
            </span>
          );

          if (isActive) {
            spanNameTag = (
              <span className="hidden text-gray-900 lg:block">{nav.name}</span>
            );
          }
          return (
            <Link key={nav.id} href={nav.link}>
              <li
                className={`flex h-9 items-center justify-center gap-4 transition-all hover:text-gray-900 md:flex-row md:items-start ${
                  isActive && 'text-gray-900'
                }`}
              >
                {React.cloneElement(nav.icon, {
                  fill: isActive ? '#B2B0AF' : 'white',
                })}
                {spanNameTag}
              </li>
            </Link>
          );
        })}
        <AuthModal title={loginMessage} />
        <AddProjectModal email={session?.user?.email} />
        <li onClick={handleAddProject}>
          <Button size="lg">Add project</Button>
        </li>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="flex items-center text-sm text-gray-500">
                <Info className="inline-block h-4 hover:text-blue-500" />
                Become a Gold Crown Member
                <Crown className="inline-block h-4 animate-wiggle text-orange-500" />
              </p>
            </TooltipTrigger>
            <TooltipContent>
              Add project for becoming a Gold Crown Member
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ul>
      <ul className="absolute bottom-4 flex w-3/4 flex-col items-start gap-4 transition-all">
        <Separator />
        {status === 'authenticated' ? (
          <SessionCard
            email={session?.user?.email || ''}
            name={session?.user?.name || ''}
            image={session?.user?.image || ''}
          />
        ) : status === 'unauthenticated' ? (
          <SessionLessCard />
        ) : (
          <div>
            <Loader className="animate-spin" />
          </div>
        )}
      </ul>
    </div>
  );
};
