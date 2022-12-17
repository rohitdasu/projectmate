import React from 'react';
import { motion } from 'framer-motion';

export type ButtonProps = {
  type?: 'button' | 'submit';
  onClick: () => void;
  isDisabled: boolean;
  haveAnimation?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  type = 'button',
  onClick,
  isDisabled,
  haveAnimation = true,
  className,
  children,
}) => (
  <motion.button
    whileTap={haveAnimation ? { scale: 0.9 } : ''}
    onClick={onClick}
    type={type}
    layout
    className={`items-center rounded-md  bg-orange-100 text-orange-500 ring-orange-800 hover:opacity-75 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400 ${className} ${
      isDisabled && 'cursor-default bg-opacity-40 opacity-60'
    }`}
    disabled={isDisabled}
  >
    {children}
  </motion.button>
);
