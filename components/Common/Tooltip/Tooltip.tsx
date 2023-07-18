import { PropsWithChildren, FC } from 'react';
import { TooltipBox } from './TooltipBox';
import { TooltipProps } from './Tooltip.interface';

export const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  children,
  text,
  direction,
}) => (
  <div className="group relative">
    {children}
    <TooltipBox text={text} direction={direction} />
  </div>
);
