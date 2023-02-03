import { Typography } from '@/components/Typography';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { useRouter } from 'next/router';
import moment from 'moment';

interface IProject {
  title: string;
  id: string;
  description: string;
  tags: Array<string>;
  createdAt: string;
}

export const Project: FC<IProject> = ({
  title,
  description,
  id,
  createdAt,
}) => {
  const router = useRouter();
  const gotoProjectDetails = (id: string) => {
    router.push(`/projects/${id}`);
  };
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex w-full flex-col items-start justify-between gap-4 rounded-lg border border-gray-700 bg-slate-800 p-2 text-gray-100 shadow-border-shadow transition-all hover:shadow-md md:p-4"
    >
      <div className="flex w-full flex-row items-center justify-between">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          {title}
        </Typography>
        <div className="flex flex-row items-center gap-1 text-gray-400">
          <Typography as="span" fontSize="3xl">
            ·
          </Typography>
          <Typography as="p" fontSize="sm" fontWeight="light">
            {moment(createdAt).fromNow()}
          </Typography>
        </div>
      </div>
      <Typography
        as="p"
        fontSize="sm"
        fontWeight="light"
        className="text-gray-300 line-clamp-5 sm:text-base"
      >
        {description}
      </Typography>
      <div className="flex w-full flex-row items-center gap-2 md:gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => gotoProjectDetails(id)}
          className="flex flex-1 cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-gray-700 px-2 py-1 text-gray-300 transition-all hover:opacity-70 md:px-3 md:py-2"
          aria-label={`Delete ${title}`}
        >
          <AiFillEye className="text-gray-100" aria-hidden="true" />
          <span>View</span>
        </motion.button>
        <button
          className="flex cursor-not-allowed flex-row items-center justify-center gap-2 rounded-md bg-green-900 px-2 py-1 text-green-100 transition-all hover:opacity-70 md:px-3 md:py-2"
          aria-label={`Edit ${title}`}
        >
          <FaEdit aria-hidden="true" />
          <span>Edit</span>
        </button>
        <button
          className="flex cursor-not-allowed flex-row items-center justify-center gap-2 rounded-md bg-red-900 p-3 px-2 py-1 text-red-100 transition-all hover:opacity-70 md:px-3 md:py-2"
          aria-label={`Delete ${title}`}
        >
          <FaTrash aria-hidden="true" />
          <span>Delete</span>
        </button>
      </div>
    </motion.li>
  );
};
