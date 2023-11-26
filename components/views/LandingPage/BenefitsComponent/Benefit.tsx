import { FC } from 'react';
import { BenefitProps } from './Benefit.interface';
export const Benefit: FC<BenefitProps> = ({
  description,
  title,
  icon: IconComponent,
}) => {
  return (
    <li className="flex flex-col items-center justify-start gap-4 md:items-start">
      <div className="flex h-10 w-10 flex-row items-center justify-center rounded-full bg-gray-200 font-medium text-gray-900">
        <IconComponent />
      </div>
      <p className="text-center text-base font-medium text-gray-900 dark:text-gray-300 md:text-left">
        {title}
      </p>
      <p className="text-center text-sm text-gray-900 dark:text-gray-300 md:text-left">
        {description}
      </p>
    </li>
  );
};
