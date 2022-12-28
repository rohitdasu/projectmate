import React from 'react';
import { TypographyProps, TextElementType } from './Typography.interface';

export const Typography = <C extends TextElementType = 'span'>({
  as,
  children,
  ...restProps
}: TypographyProps<C>) => {
  const Component = as || 'span';
  return <Component {...restProps}>{children}</Component>;
};
