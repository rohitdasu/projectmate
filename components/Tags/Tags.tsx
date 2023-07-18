import { FC } from 'react';
import { TagsProps } from './Tags.interface';
import { Tag } from './Tag';

export const Tags: FC<TagsProps> = ({
  tags,
  removeTagHandler,
  className,
  tagClassName,
}) => {
  const areTagClosable = !!removeTagHandler;

  return (
    <ul className={`flex ${className}`}>
      {tags.map((tag: string, i: number) => {
        return (
          <Tag
            title={tag}
            key={i}
            onClose={areTagClosable ? (e) => removeTagHandler(e, i) : undefined}
            className={tagClassName}
          />
        );
      })}
    </ul>
  );
};
