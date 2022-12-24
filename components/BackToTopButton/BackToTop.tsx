import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

export const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 m-5">
      <motion.button
        whileTap={{ scale: 0.7 }}
        className="mx-auto rounded-full border border-slate-600 bg-transparent p-4 font-semibold shadow-lg backdrop-blur-lg dark:border-slate-100"
        onClick={handleClick}
      >
        <FaArrowUp className="text-xl text-slate-600 dark:text-slate-100" />
      </motion.button>
    </div>
  );
};
