import React from 'react';
import { Person as PersonType } from './People.interface';
import Image from 'next/legacy/image';
import { getImageUrl } from '../Avatar/Avatar.common';
import { User } from '@prisma/client';
import { Typography } from '../Typography';
import { motion } from 'framer-motion';
export const Person = ({ id, name, profilePicture }: PersonType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const gotoProfile = (id: string) => {
    // TODO: goto user's profile and show projects related to that user
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-[calc(50%-1rem)] rounded-lg border border-gray-300 bg-gray-100 px-2 py-2 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-[177px] md:py-4"
    >
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <Image
          src={getImageUrl({ image: profilePicture } as User)}
          height={'80'}
          width={'80'}
          alt={name}
          className="rounded-full"
        />
        <Typography>{name.split(' ')[0]}</Typography>
        <button className="flex w-full cursor-not-allowed flex-row items-center justify-center rounded-full border border-gray-400 py-1 px-3 text-sm text-gray-900 transition-all hover:bg-orange-200 hover:text-orange-800 dark:border-gray-600 dark:text-gray-100 hover:dark:bg-orange-500 md:text-base">
          View profile
        </button>
      </div>
    </motion.div>
  );
};
