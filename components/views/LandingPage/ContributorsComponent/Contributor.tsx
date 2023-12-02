import { FC } from 'react';
import { Contributor as ContributorProps } from './ContributorsComponent.interface';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

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
          <section className="flex flex-row items-center justify-start">
            <p className="">{contributor.login}</p>
            <ShieldCheck fill="#3B81F6" className="ml-1 text-white" />
          </section>
        </div>
        <div className="mt-2">
          <Button variant={'outline'} asChild>
            <Link
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              title={contributor.login}
            >
              View Profile
            </Link>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
