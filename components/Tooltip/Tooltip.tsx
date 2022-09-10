import { TooltipProps } from './Tooltip.interface';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import TooltipLite from 'react-tooltip-lite';

export const Tooltip = ({
  placement = 'up',
  distanceInPx = 14,
  wrapperTag = 'span',
  wrapperClassName,
  content,
  children,
}: TooltipProps) => {
  const mode = useAppSelector((state) => state.mode.mode);

  const tipBg = mode
    ? '[&>.react-tooltip-lite]:invisible md:[&>.react-tooltip-lite]:bg-gray-500 md:[&>.react-tooltip-lite]:visible'
    : '[&>.react-tooltip-lite]:invisible md:[&>.react-tooltip-lite]:bg-gray-700 md:[&>.react-tooltip-lite]:visible';
  const arrowBorder = mode
    ? '[&>.react-tooltip-lite-arrow]:!invisible md:[&>.react-tooltip-lite-arrow]:border-gray-500 md:[&>.react-tooltip-lite-arrow]:!visible'
    : '[&>.react-tooltip-lite-arrow]:!invisible md:[&>.react-tooltip-lite-arrow]:border-gray-700 md:[&>.react-tooltip-lite-arrow]:!visible';
  const Wrapper = wrapperTag;

  return (
    <Wrapper className={wrapperClassName}>
      <TooltipLite
        content={content}
        direction={placement}
        distance={distanceInPx}
        tagName={wrapperTag}
        tipContentClassName={`${tipBg} ${arrowBorder} [&>.react-tooltip-lite]:text-white [&>.react-tooltip-lite]:text-sm [&>.react-tooltip-lite]:text-center [&>.react-tooltip-lite]:!rounded-md`}
      >
        {children}
      </TooltipLite>
    </Wrapper>
  );
};
