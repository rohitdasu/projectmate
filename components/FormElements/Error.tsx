import React from 'react';
import { motion } from 'framer-motion';
import { framer_error } from './framer';
import { MdNearbyError } from 'react-icons/md';

interface IProps {
  message: string;
}

export const InputError: React.FC<IProps> = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-2 rounded-md px-1 font-semibold text-white text-red-600 dark:font-medium dark:text-red-500"
      {...framer_error}
    >
      <MdNearbyError />
      {message}
    </motion.p>
  );
};
