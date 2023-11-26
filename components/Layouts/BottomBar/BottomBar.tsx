import React from 'react';
import { Loader, LogIn, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useAuthModal } from '@/hooks/useAuthModal';
import { NavRoutes } from '../Sidebar/data';
import { useAddProjectModal } from '@/hooks/useAddProjectModal';
import { AddProjectModal } from '@/components/Modals/AddProjectModal';
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
  const { openModal } = useAuthModal();
  const { openModal: openAddProjectModal } = useAddProjectModal();
  const { status, data } = useSession();
  const handleAddProject = () => {
    if (status === 'authenticated') {
      openAddProjectModal();
    } else {
      openModal();
    }
  };
  const router = useRouter();
  return (
    <div className="h-full w-full">
      <AddProjectModal email={data?.user?.email} />
      <ul className="flex h-14 flex-row items-center justify-around">
        {NavRoutes.map((route) => {
          const isActive = route.link === router.pathname;
          return (
            <Link href={route.link} key={route.id}>
              <li className={`${isActive && ''}`}>
                {React.cloneElement(route.icon, {
                  strokeWidth: isActive ? 2 : 1,
                })}
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
        {status === 'loading' && (
          <li>
            <Loader className="animate-spin" />
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
