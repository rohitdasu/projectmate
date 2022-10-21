import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface IProject {
  title: string;
  id: string;
}

export const Project: FC<IProject> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-full flex-row items-center justify-between rounded-lg bg-gray-100 p-4 shadow-border-shadow dark:bg-[#232931]"
    >
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 sm:text-base">
        {title}
      </p>
      <div className="flex flex-row">
        <button className="p-3 transition-all hover:opacity-70">
          <FaEdit />
        </button>
        <button className="p-3 transition-all hover:opacity-70">
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
};
