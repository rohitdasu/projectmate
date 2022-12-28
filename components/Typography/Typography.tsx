import React from 'react';
import {
  TypographyProps,
  TextElementType,
  FontWeights,
  FontSizes,
} from './Typography.interface';

export const Typography = <C extends TextElementType = 'span'>({
  as,
  align = 'left',
  fontSize = 'base',
  fontWeight = 'normal',
  children,
  className,
  ...restProps
}: TypographyProps<C>) => {
  const Component = as || 'span';
  return (
    <Component
      className={`${className} ${FontWeights[fontWeight]} ${FontSizes[fontSize]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};
