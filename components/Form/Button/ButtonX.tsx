import React, { ElementType } from 'react';
import { BtnProps } from './Button.interface';

export const Button = <T extends ElementType = 'button'>({
  children,
  as,
}: BtnProps<T>) => {
  const Component = as || 'button';
  return <Component>{children}</Component>;
};
