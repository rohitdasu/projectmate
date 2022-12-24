import { motion } from 'framer-motion';
import React from 'react';
import { getSocialLinks } from './data';

export const JoinUs = () => {
  const socialLinks = getSocialLinks();
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h2 className="text-2xl font-bold uppercase md:text-3xl">join us</h2>
      <div className="flex flex-row items-center justify-center space-x-16">
        {socialLinks.map(({ Icon, title, anchorTagProps, url }) => (
          <motion.a
            key={title}
            {...anchorTagProps}
            href={url}
            className="flex items-center justify-center rounded-md border-solid text-3xl shadow-border-shadow transition-all"
          >
            {<Icon />}
          </motion.a>
        ))}
      </div>
    </div>
  );
};
