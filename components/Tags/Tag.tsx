import { motion } from 'framer-motion';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TagProps } from './Tags.interface';

export const Tag = ({ title, className, onClick, onClose }: TagProps) => {
  const isClickable = !!onClick;
  return (
    <motion.span
      layout
      onClick={isClickable ? (e) => onClick(e, title) : undefined}
      className={`group flex w-max ${
        isClickable ? 'cursor-pointer' : 'cursor-default'
      } flex-wrap items-center rounded-full bg-background-2 !bg-slate-100 px-3 py-1 !text-slate-800 focus:ring dark:!bg-slate-900 dark:!text-slate-200 ${className}`}
    >
      <>
        {title}
        {onClose && (
          <AiFillCloseCircle
            className="ml-2 cursor-pointer"
            onClick={(e) => onClose(e, title)}
          />
        )}
      </>
    </motion.span>
  );
};
