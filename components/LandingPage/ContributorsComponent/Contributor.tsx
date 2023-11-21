import { FC } from 'react';
import { Contributor as ContributorProps } from './ContributorsComponent.interface';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
export const Contributor: FC<ContributorProps> = (contributor) => {
  return (
    <a
      key={contributor.id}
      href={contributor.html_url}
      target="_blank"
      rel="noreferrer"
      title={contributor.login}
    >
      <Avatar>
        <AvatarImage src={contributor.avatar_url}></AvatarImage>
        <AvatarFallback>{contributor.login[0]}</AvatarFallback>
      </Avatar>
    </a>
  );
};
