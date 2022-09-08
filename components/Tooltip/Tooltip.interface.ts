import { ReactNode } from 'react';

export type TooltipProps = {
  placement?: 'up' | 'down' | 'left' | 'right';
  distanceInPx?: number;
  wrapperTag?: 'span' | 'div';
  wrapperClassName?: string;
  content: string;
  children: ReactNode;
};
