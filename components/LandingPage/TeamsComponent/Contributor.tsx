import React, { FC } from 'react';
import Image from 'next/legacy/image';
import { Contributor as ContributorType } from './TeamsComponent.interface';
export const Contributor: FC<ContributorType> = (contributor) => {
  return (
    <a
      key={contributor.id}
      href={contributor.html_url}
      target="_blank"
      rel="noreferrer"
      title={contributor.login}
    >
      <li className="flex items-center justify-center">
        <Image
          src={contributor.avatar_url}
          alt={contributor.login}
          width={70}
          height={70}
          className="h-full w-full rounded-full bg-black"
        />
      </li>
    </a>
  );
};
