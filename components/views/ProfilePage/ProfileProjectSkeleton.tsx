export const ProfileProjectSkeleton = ({
  isCurrentUser,
}: {
  isCurrentUser: boolean;
}) => {
  return (
    <div className="animate-pulse border-2 border-[#0f0f0f] bg-white p-5 shadow-[4px_4px_0_0_#0f0f0f]">
      <div className="flex flex-col gap-2">
        <div className="h-6 w-36 bg-gray-200" />
        <div className="flex flex-col gap-1">
          <p className="h-3 w-full bg-gray-200" />
          <p className="h-3 w-full bg-gray-200" />
          <p className="h-3 w-full bg-gray-200" />
          <p className="h-3 w-full bg-gray-200" />
          <p className="h-3 w-full bg-gray-200" />
          <p className="h-3 w-full bg-gray-200" />
          <p className="h-3 w-full bg-gray-200" />
          <p className="h-3 w-3/4 bg-gray-200" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-10 w-20 bg-gray-200"></div>
        <div className="h-10 w-16 bg-gray-200"></div>
        {isCurrentUser && <div className="h-10 w-16 bg-gray-200"></div>}
      </div>
    </div>
  );
};
