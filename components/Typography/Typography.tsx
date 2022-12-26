import React from 'react';
import { TypographyProps } from './Typography.interface';

export const Typography = <C extends React.ElementType = 'span'>({
  as,
  children,
  ...restProps
}: TypographyProps<C>) => {
  const Component = as || 'span';
  return <Component {...restProps}>{children}</Component>;
};
