import { Typography } from '@/components/Typography';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { useRouter } from 'next/router';

interface IProject {
  title: string;
  id: string;
  description: string;
  tags: Array<string>;
}

export const Project: FC<IProject> = ({ title, description, id }) => {
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
      className="flex w-full flex-col items-start justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-gray-900  shadow-border-shadow transition-all hover:shadow-md dark:border-gray-700 dark:bg-slate-800 dark:text-gray-100"
    >
      <Typography
        as="p"
        fontSize="lg"
        fontWeight="medium"
        className="text-gray-900 dark:text-gray-100 sm:text-base"
      >
        {title}
      </Typography>
      <Typography
        as="p"
        fontSize="sm"
        fontWeight="light"
        className="text-gray-900 line-clamp-5 dark:text-gray-100 sm:text-base"
      >
        {description}
      </Typography>
      <div className="flex w-full flex-row items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => gotoProjectDetails(id)}
          className="flex flex-1 cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-gray-700 transition-all hover:opacity-70 dark:bg-gray-700 dark:text-gray-300"
          aria-label={`Delete ${title}`}
        >
          <AiFillEye
            className="text-gray-900 dark:text-gray-100"
            aria-hidden="true"
          />
          <span>View</span>
        </motion.button>
        <button
          className="flex cursor-not-allowed flex-row items-center justify-center gap-2 rounded-md bg-green-100 p-3 text-green-700 transition-all hover:opacity-70 dark:bg-green-900 dark:text-green-100"
          aria-label={`Edit ${title}`}
        >
          <FaEdit aria-hidden="true" />
          <span>Edit</span>
        </button>
        <button
          className="flex cursor-not-allowed flex-row items-center justify-center gap-2 rounded-md bg-red-100 p-3 text-red-700 transition-all hover:opacity-70 dark:bg-red-900 dark:text-red-100"
          aria-label={`Delete ${title}`}
        >
          <FaTrash aria-hidden="true" />
          <span>Delete</span>
        </button>
      </div>
    </motion.li>
  );
};
