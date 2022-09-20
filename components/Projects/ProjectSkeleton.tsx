export const ProjectSkeleton = () => (
  <div className="w-full p-2 md:p-0 animate-pulse">
    <div className="flex flex-col justify-center space-y-2 overflow-hidden rounded-md shadow-border-shadow text-foreground-1">
      <div className="flex justify-center items-center w-full h-72 bg-gray-200 sm:h-96 md:h-64">
        <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
      </div>
      <div className="flex flex-col gap-5 p-4 pt-2">
        <div className="h-4 w-32 bg-gray-200 rounded-full mt-2" />
        <div className="h-2 w-36 bg-gray-200 rounded-full" />
        <div className="mt-4">
          <div className="h-2 w-full bg-gray-200 rounded-full" />
          <div className="h-2 w-full bg-gray-200 rounded-full mt-3" />
          <div className="h-2 w-full bg-gray-200 rounded-full mt-3 hidden md:block" />
          <div className="h-2 w-56 bg-gray-200 rounded-full mt-3" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex pb-2 space-x-2 md:pb-0 mt-1">
            <div className="h-7 w-12 bg-gray-200 rounded-full px-2 py-1" />
            <div className="h-7 w-12 bg-gray-200 rounded-full px-2 py-1" />
            <div className="h-7 w-12 bg-gray-200 rounded-full px-2 py-1" />

          </div>
          <div className="h-8 w-full bg-gray-200 rounded-md px-2 py-1.5 mt-2 sm:my-0" />
        </div>
      </div>
    </div>
  </div>
)

