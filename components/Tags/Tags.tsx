import { TagsProps } from './Tags.interface';
import { useMemo } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';

export const Tags = ({
  tags,
  maximumTagsToShow,
  maximumCharactersToShow,
  removeTagHandler,
  className,
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

  return (
    <div className={`flex ${className}`}>
      {tagsToShow.map((tag: string, i: number) => {
        return (
          <motion.span
            layout
            key={i}
            onClick={
              removeTagHandler
                ? (event) => removeTagHandler(event, i)
                : undefined
            }
            className="group flex w-max cursor-pointer flex-wrap items-center rounded-full bg-background-2 !bg-slate-100 px-3 py-1 !text-slate-800 focus:ring dark:!bg-slate-900 dark:!text-slate-200"
          >
            <>
              {tag}
              {removeTagHandler && <AiFillCloseCircle className="ml-2" />}
            </>
          </motion.span>
        );
      })}
      {(maximumTagsToShow || maximumCharactersToShow) &&
        tags.length - tagsToShow.length > 0 && (
          <span className="group flex w-max cursor-pointer flex-wrap items-center rounded-full bg-background-2 !bg-slate-100 px-2 py-1 !text-slate-800 focus:ring dark:!bg-slate-900 dark:!text-slate-200">
            +{tags.length - tagsToShow.length}
          </span>
        )}
    </div>
  );
};
