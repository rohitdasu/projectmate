import { ReactNode } from 'react';
import { TooltipProps as Props } from 'react-tooltip-lite';

declare module 'react-tooltip-lite' {
  export interface TooltipProps extends Props {
    children: ReactNode;
  }
}
