import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

export type TextTypeUnion =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'p';

export type TextElementType = Extract<ElementType, TextTypeUnion>;

export type TypographyProps<C extends TextElementType> = {
  as?: C;
  children: ReactNode;
  className: string;
} & ComponentPropsWithoutRef<C>;
