import React from 'react';

export type ButtonProps = {
  type?: 'button' | 'submit';
  onClick: () => void;
  isDisabled: boolean;
  haveAnimation?: boolean;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  as?: string;
};

export type ButtonPropsX<T extends React.ElementType> = {
  haveAnimation?: boolean;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  as?: T;
};

export type BtnProps<T extends React.ElementType> = ButtonPropsX<T> &
  Omit<React.ComponentProps<T>, keyof ButtonPropsX<T>>;
