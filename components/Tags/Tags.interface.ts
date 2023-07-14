import { MouseEvent } from 'react';

export type RemoveTagFc = (event: MouseEvent, index: number) => void;

export interface TagsProps {
  tags: string[];
  removeTagHandler?: RemoveTagFc;
  className?: string;
  tagClassName?: string;
}

export type OnTagClickFc = (event: MouseEvent, tagTitle: string) => void;
export interface TagProps {
  title: string;
  onClick?: OnTagClickFc;
  onClose?: OnTagClickFc;
  className?: string;
}
