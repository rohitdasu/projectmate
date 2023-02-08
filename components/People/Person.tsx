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
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 transition-all hover:shadow-md lg:p-4"
    >
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <Image
          src={getImageUrl({ image: profilePicture } as User)}
          height={'80'}
          width={'80'}
          alt={name}
          className="rounded-full"
        />
        <Typography>{name.trim().split(' ')[0]}</Typography>
        <button className="flex w-full cursor-not-allowed flex-row items-center justify-center rounded-full border border-gray-400 border-gray-600 py-1 px-2 text-sm text-gray-100 transition-all hover:bg-orange-500 md:text-base">
          View profile
        </button>
      </div>
    </motion.div>
  );
};
