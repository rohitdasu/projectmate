import { useSession, signOut } from 'next-auth/react';
import { ChevronDown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthModal } from '@/hooks/useAuthModal';

export const AccountMenu = () => {
  const { data: session, status } = useSession();
  const { openModal } = useAuthModal();

  if (status === 'unauthenticated') {
    return (
      <button
        type="button"
        onClick={openModal}
        className="shrink-0 border-2 border-[#0f0f0f] bg-white px-3 py-2 font-display text-[10px] font-bold uppercase transition-colors hover:bg-[#0f0f0f] hover:text-white sm:px-4 sm:text-xs"
      >
        Sign in
      </button>
    );
  }

  if (status !== 'authenticated') return null;

  const name = session.user?.name || 'Account';
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 border-2 border-[#0f0f0f] bg-white p-1 pr-2 font-display text-[10px] font-bold uppercase transition-colors hover:bg-[#eaf0ff] sm:gap-2 sm:py-1 sm:pl-1"
          aria-label="Open account menu"
        >
          <Avatar className="h-7 w-7 rounded-none border border-[#0f0f0f]">
            <AvatarImage src={session.user?.image || undefined} alt="" />
            <AvatarFallback className="rounded-none bg-[#eaf0ff] text-[#0044ff]">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-24 truncate sm:inline">{name}</span>
          <ChevronDown size={14} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-none border-2 border-[#0f0f0f] bg-white p-1 text-[#0f0f0f] shadow-[4px_4px_0_0_#0044ff]"
      >
        <DropdownMenuLabel className="px-3 py-2">
          <span className="block font-display text-xs font-bold uppercase">
            {name}
          </span>
          {session.user?.email ? (
            <span className="mt-1 block truncate text-xs font-normal text-gray-500">
              {session.user.email}
            </span>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200" />
        <DropdownMenuItem
          onSelect={() => void signOut({ redirect: false })}
          className="cursor-pointer rounded-none px-3 py-2 font-display text-xs font-bold uppercase focus:bg-[#eaf0ff] focus:text-[#0044ff]"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
