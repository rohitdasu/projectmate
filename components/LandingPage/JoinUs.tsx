import { motion } from 'framer-motion';
import React from 'react';
import { getSocialLinks } from './data';

export const JoinUs = () => {
  const socialLinks = getSocialLinks();
  return (
    <div className="flex flex-col items-center justify-center rounded-full p-8">
      <h2 className="mb-20 text-2xl font-bold uppercase md:text-3xl">
        join us
      </h2>
      <div className="flex flex-row items-center justify-center space-x-16">
        {socialLinks.map(({ Icon, title, anchorTagProps, url }) => (
          <motion.a
            whileHover={{ scale: 1.2 }}
            key={title}
            {...anchorTagProps}
            href={url}
            className="flex items-center justify-center text-5xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            {<Icon />}
          </motion.a>
        ))}
      </div>
    </div>
  );
};
