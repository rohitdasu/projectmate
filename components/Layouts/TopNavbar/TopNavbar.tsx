import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Loader, LogIn, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { useAuthModal } from '@/hooks/useAuthModal';
import { Logo } from '@/components/Common/Logo';

export const TopNavbar = () => {
  const { setTheme } = useTheme();
  const { data, status } = useSession();
  const { openModal } = useAuthModal();
  return (
    <div className="flex h-14 flex-row items-center justify-between px-4 backdrop-blur-sm">
      <Logo route={'/'} />
      <section className="flex flex-row items-center gap-2">
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
        {status === 'authenticated' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="h-10 w-10">
              <Avatar>
                <AvatarImage src={data?.user?.image || undefined} />
                <AvatarFallback className="dark:bg-black">
                  {data?.user?.name && data.user.name[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                <p className="leading-none">My Account</p>
                <span className="mt-1 inline-block text-xs text-black/60 dark:text-white/60">
                  {data?.user?.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ redirect: false })}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {status === 'unauthenticated' && (
          <Button variant="secondary" size={'icon'}>
            <LogIn onClick={openModal} />
          </Button>
        )}
        {status === 'loading' && (
          <Button variant={'ghost'}>
            <Loader className="animate-spin" />
          </Button>
        )}
      </section>
    </div>
  );
};
