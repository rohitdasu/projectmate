import { motion } from 'framer-motion';

export const ProjectSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full animate-pulse p-2 md:p-0"
  >
    <div className="flex h-full flex-col justify-center space-y-2 overflow-hidden rounded-md  shadow-border-shadow">
      <div className="flex flex-col gap-5 p-4 pt-2">
        <div className="mt-2 h-4 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-2 w-36 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-3 h-2 w-56 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="mt-1 flex space-x-2 pb-2 md:pb-0">
            <div className="h-7 w-12 rounded-full bg-gray-200 px-2 py-1 dark:bg-gray-700" />
            <div className="h-7 w-12 rounded-full bg-gray-200 px-2 py-1 dark:bg-gray-700" />
            <div className="h-7 w-12 rounded-full bg-gray-200 px-2 py-1 dark:bg-gray-700" />
          </div>
          <div className="mt-2 h-8 w-full rounded-md bg-gray-200 px-2 py-1.5 dark:bg-gray-700 sm:my-0" />
        </div>
      </div>
    </div>
  </motion.div>
);
