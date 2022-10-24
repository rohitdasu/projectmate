type TagsProps = {
  tags: string[];
  tagsNumber: number;
};

export const Tags = ({ tags, tagsNumber }: TagsProps) => (
  <>
    {tags.slice(0, tagsNumber).map((tag: string, i: number) => (
      <p
        key={i}
        className="cursor-pointer rounded-full bg-background-2 bg-orange-100 px-2 py-1 text-sm font-medium text-orange-500 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400"
      >
        {tag}
      </p>
    ))}
    {tags.length - tagsNumber > 0 && (
      <p className="cursor-pointer rounded-full bg-background-2 bg-orange-100 px-2 py-1 text-sm font-medium text-orange-500 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400">
        +{tags.length - tagsNumber}
      </p>
    )}
  </>
);
