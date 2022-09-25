type TagsProps = {
  tags: string[];
  tagsNumber: number;
};

export const Tags = ({ tags, tagsNumber }: TagsProps) => (
  <>
    {tags.slice(0, tagsNumber).map((tag: string, i: number) => (
      <p
        key={i}
        className="px-2 py-1 text-sm font-medium text-blue-500 rounded-full cursor-pointer bg-background-2"
      >
        {tag}
      </p>
    ))}
    {tags.length - tagsNumber > 0 && (
      <p className="px-2 py-1 text-sm font-medium text-blue-500 rounded-full cursor-pointer bg-background-2">
        +{tags.length - tagsNumber}
      </p>
    )}
  </>
);
