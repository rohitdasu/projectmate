import { MouseEvent } from 'react';

export type RemoveTagFc = (event: MouseEvent, index: number) => void;

export type TagsProps = {
  tags: string[];
  maximumTagsToShow?: number;
  maximumCharactersToShow?: number;
  removeTagHandler?: RemoveTagFc;
  className?: string;
};
