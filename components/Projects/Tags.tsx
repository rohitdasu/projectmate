type TagsProps = {
  tags: string[];
  tagsNumber: number;
};

export const Tags = ({ tags, tagsNumber }: TagsProps) => (
  <>
    {tags.slice(0, tagsNumber).map((tag: string, i: number) => (
      <p
        key={i}
        className="cursor-pointer rounded-full bg-background-2 px-2 py-1 text-sm font-medium text-blue-500"
      >
        {tag}
      </p>
    ))}
    {tags.length - tagsNumber > 0 && (
      <p className="cursor-pointer rounded-full bg-background-2 px-2 py-1 text-sm font-medium text-blue-500">
        +{tags.length - tagsNumber}
      </p>
    )}
  </>
);
