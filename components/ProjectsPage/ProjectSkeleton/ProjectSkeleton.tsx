import { motion } from 'framer-motion';

export const ProjectSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="animate-pulse border border-gray-200"
  >
    <div className="shadow-border-shadow flex h-full flex-col justify-center space-y-2 overflow-hidden rounded-md">
      <div className="flex flex-col gap-5 p-4 pt-2">
        <div className="flex justify-between space-y-2">
          <div className="h-6 w-36 rounded-md bg-gray-700" />
          <div className="h-6 w-28 rounded-md bg-gray-700" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-gray-700" />
          <div className="h-6 w-36 rounded-md bg-gray-700" />
        </div>
        <div>
          <div className="h-3 w-full rounded-full bg-gray-700" />
          <div className="mt-3 h-3 w-full rounded-full bg-gray-700" />
          <div className="mt-3 h-3 w-full rounded-full bg-gray-700" />
          <div className="mt-3 h-3 w-full rounded-full bg-gray-700" />
          <div className="mt-3 h-3 w-full rounded-full bg-gray-700" />
          <div className="mt-3 h-3 w-56 rounded-full bg-gray-700" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="mt-1 flex space-x-2 pb-2 md:pb-0">
            <div className="h-5 w-12 rounded-full bg-gray-700 px-2 py-1" />
            <div className="h-5 w-12 rounded-full bg-gray-700 px-2 py-1" />
            <div className="h-5 w-12 rounded-full bg-gray-700 px-2 py-1" />
            <div className="h-5 w-12 rounded-full bg-gray-700 px-2 py-1" />
          </div>
          <div className="mt-1 flex justify-between space-x-2 pb-2 md:pb-0">
            <div className="flex space-x-2">
              <div className="h-7 w-16 rounded-md bg-gray-700 px-2 py-1" />
              <div className="h-7 w-16 rounded-md bg-gray-700 px-2 py-1" />
            </div>
            <div className="h-7 w-16 rounded-md bg-gray-700 px-2 py-1" />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);
