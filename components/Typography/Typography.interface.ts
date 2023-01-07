import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

export type TextElementsUnion =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'p';

export type TextElementType = Extract<ElementType, TextElementsUnion>;

export type Alignment = 'center' | 'inherit' | 'justify' | 'left' | 'right';

export enum FontSizes {
  'xs' = 'text-xs',
  'sm' = 'text-sm',
  'base' = 'text-base',
  'lg' = 'text-lg',
  'xl' = 'text-xl',
  '2xl' = 'text-2xl',
  '3xl' = 'text-3xl',
  '4xl' = 'text-4xl',
  '5xl' = 'text-5xl',
  '6xl' = 'text-6xl',
  '7xl' = 'text-7xl',
}

export type FontSizesUnion = keyof typeof FontSizes;

export enum FontWeights {
  'light' = 'font-light',
  'normal' = 'font-normal',
  'medium' = 'font-medium',
  'semibold' = 'font-semibold',
  'bold' = 'font-bold',
}

export type FontWeightsUnion = keyof typeof FontWeights;

export type TypographyProps<C extends TextElementType> = {
  as?: C;
  align?: Alignment;
  fontSize?: FontSizesUnion;
  fontWeight?: FontWeightsUnion;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<C>;
