import { ReactElement, FC } from 'react';
import { TooltipBox } from './TooltipBox';

export const Tooltip: FC<{
  children: ReactElement;
  text: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}> = (props) => {
  const { children, text, direction } = props;

  return (
    <div className="group relative">
      {children}
      <TooltipBox text={text} direction={direction} />
    </div>
  );
};
