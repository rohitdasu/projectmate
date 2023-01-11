import { motion } from 'framer-motion';
import { RxCross1 } from 'react-icons/rx';
import { TagProps } from './Tags.interface';

export const Tag = ({ title, className, onClick, onClose }: TagProps) => {
  const isClickable = !!onClick;
  return (
    <motion.div
      layout
      onClick={isClickable ? (e) => onClick(e, title) : undefined}
      className={`flex w-max ${
        isClickable ? 'cursor-pointer' : 'cursor-default'
      } flex-wrap items-center rounded-full bg-slate-100 px-3 py-1 text-slate-800 focus:ring dark:bg-slate-900 dark:text-slate-200 ${className}`}
    >
      <>
        <span>{title}</span>
        {onClose && (
          <RxCross1
            className="ml-2 cursor-pointer"
            onClick={(e) => onClose(e, title)}
          />
        )}
      </>
    </motion.div>
  );
};
