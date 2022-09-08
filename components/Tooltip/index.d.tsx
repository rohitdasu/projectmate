import { ReactNode } from 'react';

declare module 'react-tooltip-lite' {
  export interface TooltipProps {
    children: ReactNode;
  }
}
