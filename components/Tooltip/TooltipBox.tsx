import { FC } from 'react';

export const TooltipBox: FC<{
  text: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}> = (props) => {
  const { text, direction } = props;

  const directionStyles = [
    'absolute z-[1000] invisible h-max w-max max-w-[15rem] rounded-md bg-gray-600 p-2 text-center text-xs leading-relaxed text-white group-hover:visible',
  ];
  const tooltipBoxArrowStyles = ['absolute h-0 w-0 border-transparent'];

  switch (direction) {
    case 'left':
      directionStyles.push('mr-4 right-full top-1/2 -translate-y-1/2');
      tooltipBoxArrowStyles.push(
        'top-1/2 -translate-y-1/2 left-full border-l-gray-600 border-t-transparent border-b-transparent border-t-[6px] border-b-[6px] border-l-[6px]'
      );
      break;
    case 'right':
      directionStyles.push('ml-4 left-full top-1/2 -translate-y-1/2');
      tooltipBoxArrowStyles.push(
        'top-1/2 -translate-y-1/2 right-full border-r-gray-600 border-t-transparent border-b-transparent border-t-[6px] border-b-[6px] border-r-[6px]'
      );
      break;
    case 'top':
      directionStyles.push('mb-4 bottom-full right-1/2 translate-x-1/2');
      tooltipBoxArrowStyles.push(
        'left-1/2 -translate-x-1/2 top-full border-t-gray-600 border-l-transparent border-r-transparent border-l-[6px] border-r-[6px] border-t-[6px]'
      );
      break;
    default:
      directionStyles.push('mt-4 top-full right-1/2 translate-x-1/2');
      tooltipBoxArrowStyles.push(
        'left-1/2 -translate-x-1/2 bottom-full border-b-gray-600 border-l-transparent border-r-transparent border-l-[6px] border-r-[6px] border-b-[6px]'
      );
  }

  return (
    <div className={directionStyles.join(' ')}>
      {text}
      <span className={tooltipBoxArrowStyles.join(' ')}></span>
    </div>
  );
};
