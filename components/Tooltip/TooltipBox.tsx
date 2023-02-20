import { FC } from 'react';

export const TooltipBox: FC<{
  text: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}> = (props) => {
  const { text, direction } = props;

  const directionStyles = [
    'invisible absolute z-[1000] h-max w-max max-w-[15rem] rounded-md border-2 border-gray-600 bg-gray-600 p-2 text-center text-xs leading-relaxed text-white group-hover:visible',
  ];
  const tooltipBoxArrowStyles = ['absolute h-0 w-0 border-transparent'];

  switch (direction) {
    case 'left':
      directionStyles.push('mr-4 right-full top-1/2 -translate-y-1/2');
      tooltipBoxArrowStyles.push(
        'top-1/2 left-full -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-l-gray-600 border-t-transparent border-b-transparent'
      );
      break;
    case 'right':
      directionStyles.push('ml-4 left-full top-1/2 -translate-y-1/2');
      tooltipBoxArrowStyles.push(
        'top-1/2 right-full -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-r-gray-600 border-t-transparent border-b-transparent'
      );
      break;
    case 'top':
      directionStyles.push('mb-4 bottom-full right-1/2 translate-x-1/2');
      tooltipBoxArrowStyles.push(
        'left-1/2 top-full -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-t-gray-600 border-l-transparent border-r-transparent'
      );
      break;
    default:
      directionStyles.push('mt-4 top-full right-1/2 translate-x-1/2');
      tooltipBoxArrowStyles.push(
        'left-1/2 bottom-full -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-b-gray-600 border-l-transparent border-r-transparent'
      );
  }

  return (
    <div className={directionStyles.join(' ')}>
      {text}
      <span className={tooltipBoxArrowStyles.join(' ')}></span>
    </div>
  );
};
