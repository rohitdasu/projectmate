import React from 'react';
import { useAppSelector } from '../../app/hooks';

export const Features = () => {
  const Mode = useAppSelector((state) => state.mode.mode);
  return (
    <div
      className={`${
        Mode ? 'bg-gray-700 text-white' : 'bg-gray-200'
      } w-[280px] h-[650px] rounded-md   fixed xl:inline-flex hidden right-6`}
    >
      <h1 className="font-semibold w-max mx-auto my-2 text-xl ">Features</h1>
    </div>
  );
};
