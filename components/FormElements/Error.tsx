import React from 'react';
import { motion } from 'framer-motion';
import { framer_error } from './framer';

export const InputError = ({ message }) => {
  return (
    <motion.p
      className="rounded-md bg-red-600 px-1 text-white dark:bg-red-700"
      {...framer_error}
    >
      {message}
    </motion.p>
  );
};
