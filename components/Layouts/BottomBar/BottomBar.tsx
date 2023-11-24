import React from 'react';
import { LogIn, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { AuthModal } from '@/components/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import { NavRoutes } from '../Sidebar/data';
import { useAddProjectModal } from '@/hooks/useAddProjectModal';
import { AddProjectModal } from '@/components/AddProjectModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export const BottomBar = () => {
  const message = 'Continue with your social account';
  const { openModal } = useAuthModal();
  const { openModal: openAddProjectModal } = useAddProjectModal();
  const [loginMessage, setLoginMessage] = React.useState(message);
  const { status, data } = useSession();
  const handleAddProject = () => {
    if (status === 'authenticated') {
      openAddProjectModal();
    } else {
      setLoginMessage('Login with your account to add project');
      openModal();
    }
  };
  const router = useRouter();
  return (
    <div className="h-full w-full">
      <AuthModal title={loginMessage} />
      <AddProjectModal email={data?.user?.email} />
      <ul className="flex h-14 flex-row items-center justify-around">
        {NavRoutes.map((route) => {
          const isActive = route.link === router.pathname;
          return (
            <Link href={route.link} key={route.id}>
              <li className={`${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                {route.icon}
              </li>
            </Link>
          );
        })}
        {status === 'authenticated' && (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="h-8 w-8">
                <Avatar className="border-2 border-gray-700">
                  <AvatarImage src={data?.user?.image || undefined} />
                  <AvatarFallback>
                    {data?.user?.name && data.user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                <DropdownMenuItem disabled>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ redirect: false })}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        )}
        {status === 'unauthenticated' && (
          <li>
            <LogIn onClick={openModal} />
          </li>
        )}
      </ul>
      <section className="fixed bottom-20 right-5">
        <Button
          onClick={handleAddProject}
          size={'icon'}
          className="h-12 w-12 rounded-full"
        >
          <PlusCircle className="h-8 w-8" />
        </Button>
      </section>
    </div>
  );
};
