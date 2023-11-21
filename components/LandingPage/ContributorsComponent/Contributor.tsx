import { FC } from 'react';
import { Contributor as ContributorProps } from './ContributorsComponent.interface';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { MdVerified } from 'react-icons/md';
import { Button } from '@/components/ui/button';
export const Contributor: FC<ContributorProps> = (contributor) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={contributor.avatar_url}></AvatarImage>
          <AvatarFallback>{contributor.login[0]}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>

      <HoverCardContent>
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-14 w-14">
            <AvatarImage src={contributor.avatar_url} />
            <AvatarFallback>{contributor.login[0]}</AvatarFallback>
          </Avatar>
          <section className="flex flex-row items-center gap-1">
            <p>{contributor.login}</p>
            <MdVerified className="text-blue-500" />
          </section>
        </div>
        <div className="mt-2">
          <a
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noreferrer"
            title={contributor.login}
          >
            <Button variant={'outline'}>View Profile</Button>
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
