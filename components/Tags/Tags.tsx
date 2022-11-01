import { TagsProps } from './Tags.interface';
import { useMemo } from 'react';

export const Tags = ({
  tags,
  maximumTagsToShow,
  maximumCharactersToShow,
  className,
}: TagsProps) => {
  const tagsToShow: string[] = useMemo(() => {
    if (maximumTagsToShow && maximumCharactersToShow) {
      let charactersCount = 0;
      const newValue = tags
        .filter((tag) => {
          charactersCount += tag.length;
          return charactersCount < maximumCharactersToShow;
        })
        .slice(0, maximumTagsToShow);
      return newValue;
    }
    if (maximumTagsToShow) {
      return tags.slice(0, maximumTagsToShow);
    }
    if (maximumCharactersToShow) {
      let charactersCount = 0;
      const newValue = tags.filter((tag) => {
        charactersCount += tag.length;
        return charactersCount < maximumCharactersToShow;
      });
      return newValue;
    }
    return tags;
  }, [maximumCharactersToShow, maximumTagsToShow, tags]);

  return (
    <div className={`flex ${className}`}>
      {tagsToShow.map((tag: string, i: number) => {
        return (
          <span
            key={i}
            className="group flex w-max cursor-pointer flex-wrap items-center rounded-full bg-background-2 bg-orange-100 px-3 py-1 text-orange-500 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400"
          >
            {tag}
          </span>
        );
      })}
      {(maximumTagsToShow || maximumCharactersToShow) &&
        tags.length - tagsToShow.length > 0 && (
          <span className="group flex w-max cursor-pointer flex-wrap items-center rounded-full bg-background-2 bg-orange-100 px-2 py-1 text-orange-500 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400">
            +{tags.length - tagsToShow.length}
          </span>
        )}
    </div>
  );
};
