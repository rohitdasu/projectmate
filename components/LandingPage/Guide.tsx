import { motion } from 'framer-motion';
import React from 'react';
import { guide_steps as data } from './data';
import { Typography } from '@/components/Typography';

export const Guide = () => {
  return (
    <div>
      <Typography
        as="h2"
        align="center"
        fontSize="2xl"
        fontWeight="bold"
        className="md:text-3xl"
      >
        How it Works ?
      </Typography>
      <ul className="relative mt-20 flex flex-col items-center gap-[3rem] lg:flex-row lg:items-stretch lg:gap-[3rem]">
        {data.map((item) => {
          const { title, desc, Icon } = item;
          return (
            <motion.li
              key={title}
              className="relative flex w-[100%] max-w-[30rem] flex-col items-center gap-2 rounded-md bg-slate-200 p-5 text-center shadow-md dark:bg-slate-800"
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className="text-2xl" />
                <Typography
                  as="h2"
                  fontSize="base"
                  fontWeight="semibold"
                  className="uppercase text-gray-800 dark:text-gray-300 md:text-lg"
                >
                  {title}
                </Typography>
              </div>
              <Typography
                as="p"
                align="center"
                fontSize="sm"
                fontWeight="light"
                className="text-gray-800 dark:text-gray-300 md:text-base"
              >
                {desc}
              </Typography>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
