import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

export const BackToTop = () => {
  const [scrollY, setScrollY] = React.useState(0);
  const SCROLL_VALUE = 300;

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 m-5">
      {scrollY > SCROLL_VALUE && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          whileTap={{ scale: 0.7 }}
          className="mx-auto animate-bounce rounded-full border border-slate-600 bg-transparent p-4 font-semibold shadow-lg backdrop-blur-lg dark:border-slate-100"
          onClick={handleClick}
        >
          <FaArrowUp className="text-xl text-slate-600 dark:text-slate-100" />
        </motion.button>
      )}
    </div>
  );
};
