import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

export type TypographyProps<C extends ElementType> = {
  as?: C;
  children: ReactNode;
  className: string;
} & ComponentPropsWithoutRef<C>;
