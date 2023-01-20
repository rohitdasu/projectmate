import { Typography } from '@/components/Typography';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface IProject {
  title: string;
  id: string;
}

export const Project: FC<IProject> = ({ title }) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-full flex-row items-center justify-between rounded-lg bg-slate-200 p-4 text-gray-900 shadow-border-shadow dark:bg-slate-800 dark:text-gray-100"
    >
      <Typography
        as="p"
        fontSize="sm"
        fontWeight="medium"
        className="text-gray-900 dark:text-gray-100 sm:text-base"
      >
        {title}
      </Typography>
      <div className="flex flex-row">
        <button
          className="cursor-not-allowed p-3 transition-all hover:opacity-70"
          aria-label={`Edit ${title}`}
        >
          <FaEdit aria-hidden="true" />
        </button>
        <button
          className="cursor-not-allowed p-3 transition-all hover:opacity-70"
          aria-label={`Delete ${title}`}
        >
          <FaTrash aria-hidden="true" />
        </button>
      </div>
    </motion.li>
  );
};
