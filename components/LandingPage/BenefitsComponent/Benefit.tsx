import React, { FC } from 'react';
import { Benefit as BenefitType } from './Benefit.interface';
import { FaStarOfLife } from 'react-icons/fa';
export const Benefit: FC<BenefitType> = ({ description, title }) => {
  return (
    <li className="flex flex-col items-center justify-start gap-4 md:items-start">
      <div className="flex h-10 w-10 flex-row items-center justify-center rounded-full bg-gray-300 font-medium text-gray-900">
        <FaStarOfLife className="animate-spin text-sm" />
      </div>
      <p className="text-center text-base text-gray-200 md:text-left">
        {title}
      </p>
      <p className="text-center text-sm text-gray-400 md:text-left">
        {description}
      </p>
    </li>
  );
};
