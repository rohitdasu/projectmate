import { FC } from 'react';
import { User } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';

export const SessionCard: FC<Pick<User, 'email' | 'name' | 'image'>> = ({
  name,
  image,
}) => {
  return (
    <li>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <section className="flex flex-row items-center justify-start gap-3">
            <Avatar>
              <AvatarImage src={image || undefined} />
              <AvatarFallback>{name && name[0]}</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </section>
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
  );
};
