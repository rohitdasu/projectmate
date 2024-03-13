import { FC } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { Logo } from '@/components/Common/Logo';
import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';

interface HeaderProps {
  homeRoute?: string;
}

export const Header: FC<HeaderProps> = ({ homeRoute = '/' }) => {
  const { setTheme } = useTheme();
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/60 px-4 backdrop-blur-md dark:bg-black/60">
      <div className="mx-auto flex h-14 max-w-screen-lg flex-row items-center justify-between md:h-20 md:px-8 xl:px-0">
        <Logo route={homeRoute} />
        <section className="flex items-center gap-2">
          <Link
            href={'https://github.com/rohitdasu/projectmate'}
            target="_blank"
          >
            <FaGithub className="text-xl text-black hover:text-black/60 dark:text-white dark:hover:text-white/60 md:text-3xl" />
          </Link>
          <Link href={'https://discord.com/invite/FQtyMWFZQ9'} target="_blank">
            <FaDiscord className="text-xl text-black hover:text-black/60 dark:text-white dark:hover:text-white/60 md:text-3xl" />
          </Link>
          <Link href={'https://twitter.com/projectmateHQ'} target="_blank">
            <FaTwitter className="text-xl text-black hover:text-black/60 dark:text-white dark:hover:text-white/60 md:text-3xl" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
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
        </section>
      </div>
    </nav>
  );
};
