export const ProfileProjectSkeleton = ({
  isCurrentUser,
}: {
  isCurrentUser: boolean;
}) => {
  return (
    <div className="animate-pulse rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="h-6 w-36 bg-gray-700" />
        <div className="flex flex-col gap-1">
          <p className="h-3 w-full bg-gray-700" />
          <p className="h-3 w-full bg-gray-700" />
          <p className="h-3 w-full bg-gray-700" />
          <p className="h-3 w-full bg-gray-700" />
          <p className="h-3 w-full bg-gray-700" />
          <p className="h-3 w-full bg-gray-700" />
          <p className="h-3 w-full bg-gray-700" />
          <p className="h-3 w-3/4 bg-gray-700" />
        </div>
      </div>
      {isCurrentUser && (
        <div className="mt-4 flex gap-2">
          <div className="h-10 w-20 rounded-md bg-gray-700"></div>
          <div className="h-10 w-16 rounded-md bg-gray-700"></div>
          <div className="h-10 w-16 rounded-md bg-gray-700"></div>
        </div>
      )}
    </div>
  );
};
