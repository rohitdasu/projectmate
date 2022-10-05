import React from 'react';
import { guide_steps as data } from './data';

export const Guide = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-bold">How it works ?</h2>
      <ul className="relative my-[5rem] flex flex-col items-center gap-[3rem] lg:flex-row lg:gap-[3rem]">
        <li className="absolute top-0 left-[50%] -z-10 h-[100%] w-[3px] border-2 border-dashed border-orange-500 bg-gradient-to-r dark:border-yellow-300 lg:left-0 lg:top-[50%] lg:h-[3px] lg:w-[95%]"></li>
        {data.map((item, idx) => {
          const { title, desc, Icon } = item;
          return (
            <li
              key={title}
              className="relative flex w-[100%] max-w-[30rem] flex-col items-center gap-2 rounded-md bg-gray-100 p-5 text-center dark:bg-[#2b2b2b]"
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className="text-5xl" />
                <h2 className="text-lg font-semibold uppercase ">{title}</h2>
              </div>
              <p className="font-light dark:text-gray-300">{desc}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
