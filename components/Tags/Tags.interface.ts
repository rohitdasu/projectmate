import { MouseEvent } from 'react';

export type RemoveTagFc = (event: MouseEvent, index: number) => void;

export type TagsProps = {
  tags: string[];
  removeTagHandler?: RemoveTagFc;
  className?: string;
  tagClassName?: string;
};

export type OnTagClick = (event: MouseEvent, tagTitle: string) => void;

export type TagProps = {
  title: string;
  onClick?: OnTagClick;
  onClose?: OnTagClick;
  className?: string;
};
