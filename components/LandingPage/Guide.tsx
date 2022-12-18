import { motion } from 'framer-motion';
import React from 'react';
import { guide_steps as data } from './data';

export const Guide = () => {
  return (
    <div className="py-28 px-4">
      <h2 className="text-center text-2xl font-bold md:text-3xl">
        How it Works ?
      </h2>
      <ul className="relative mt-[5rem] flex flex-col items-center gap-[3rem] lg:flex-row lg:items-stretch lg:gap-[3rem]">
        <li className="absolute top-0 left-[50%] -z-10 h-[100%] w-[3px] rounded-[50%] border-2 border-dashed border-orange-500 bg-gradient-to-r dark:border-yellow-300 lg:left-0 lg:top-[50%] lg:h-[3px] lg:w-[95%]"></li>
        {data.map((item) => {
          const { title, desc, Icon } = item;
          return (
            <motion.li
              whileHover={{ scale: 1.1 }}
              key={title}
              className="relative flex w-[100%] max-w-[30rem] flex-col items-center gap-2 rounded-md bg-slate-100 p-5 text-center shadow-lg hover:bg-slate-200 dark:bg-slate-800 hover:dark:bg-gray-900"
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className="text-2xl" />
                <h2 className="text-md font-semibold uppercase text-gray-700 dark:text-gray-300 md:text-lg">
                  {title}
                </h2>
              </div>
              <p className="md:text-md text-sm font-light text-gray-700 dark:text-gray-300">
                {desc}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
