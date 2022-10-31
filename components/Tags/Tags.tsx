import { TagsProps } from './Tags.interface';

export const Tags = ({ tags, tagsToShow, className }: TagsProps) => {
  const trimmedTags = tagsToShow ? tags.slice(0, tagsToShow) : tags;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {trimmedTags.slice(0, tagsToShow).map((tag: string, i: number) => (
        <span
          key={i}
          className="group flex w-max cursor-pointer flex-wrap items-center rounded-full bg-background-2 bg-orange-100 px-3 py-2 text-sm text-[15px] text-orange-500 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400"
        >
          {tag}
        </span>
      ))}
      {tagsToShow && tags.length - tagsToShow > 0 && (
        <span className="group flex w-max cursor-pointer flex-wrap items-center rounded-full bg-background-2 bg-orange-100 px-3 py-2 text-sm text-[15px] text-orange-500 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400">
          +{tags.length - tagsToShow}
        </span>
      )}
    </div>
  );
};
