import { FC } from 'react';
import { InputErrorProps } from './Input.interface';
import { motion } from 'framer-motion';
import { MdError } from 'react-icons/md';

export const InputError: FC<InputErrorProps> = ({ message }) => {
  return (
    <motion.p
      className="flex w-max items-center gap-1 rounded-md bg-red-100 px-2 font-normal text-red-600"
      {...framer_error}
    >
      <MdError />
      <span>{message?.toString()}</span>
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};
