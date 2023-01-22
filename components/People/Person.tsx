import React from 'react';
import { Person as PersonType } from './People.interface';
import Image from 'next/legacy/image';
import { getImageUrl } from '../Avatar/Avatar.common';
import { User } from '@prisma/client';
import { FaExternalLinkAlt } from 'react-icons/fa';
export const Person = ({ id, name, profilePicture }: PersonType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const gotoProfile = (id: string) => {
    // TODO: goto user's profile and show projects related to that user
  };
  return (
    <div className="flex w-full flex-row items-center justify-center gap-8 rounded-lg bg-gray-200 px-16 py-4 dark:bg-gray-800 md:w-72 md:px-2">
      <div className="flex items-center gap-4">
        <Image
          src={getImageUrl({ image: profilePicture } as User)}
          height={'80'}
          width={'80'}
          alt={name}
          className="rounded-full"
        />
        <span>{name.split(' ')[0]}</span>
      </div>
      <FaExternalLinkAlt
        onClick={() => gotoProfile(id)}
        className="text-lg transition-all hover:cursor-not-allowed hover:text-primary-color"
      />
    </div>
  );
};
