import { TagsProps } from './Tags.interface';
import { useMemo } from 'react';
import { Tag } from './Tag';

export const Tags = ({
  tags,
  maximumTagsToShow,
  maximumCharactersToShow,
  removeTagHandler,
  className,
  tagClassName,
}: TagsProps) => {
  const tagsToShow = useMemo(() => {
    let tempArray = tags;
    if (maximumTagsToShow) tempArray = tags.slice(0, maximumTagsToShow);
    if (maximumCharactersToShow) {
      let charactersCount = 0;
      if (tempArray[0].length > maximumCharactersToShow) {
        tempArray[0] = `${tempArray[0].slice(
          0,
          maximumCharactersToShow - 3
        )}...`;
      }
      tempArray = tempArray.filter((tag: string) => {
        charactersCount += tag.length;
        return charactersCount <= maximumCharactersToShow;
      });
    }
    return tempArray;
  }, [maximumCharactersToShow, maximumTagsToShow, tags]);

  const areTagClosable = !!removeTagHandler;

  return (
    <div className={`flex ${className}`}>
      {tagsToShow.map((tag: string, i: number) => {
        return (
          <Tag
            title={tag}
            key={i}
            onClose={areTagClosable ? (e) => removeTagHandler(e, i) : undefined}
            className={tagClassName}
          />
        );
      })}
      {(maximumTagsToShow || maximumCharactersToShow) &&
        tags.length - tagsToShow.length > 0 && (
          <Tag title={`+${tags.length - tagsToShow.length}`} />
        )}
    </div>
  );
};
