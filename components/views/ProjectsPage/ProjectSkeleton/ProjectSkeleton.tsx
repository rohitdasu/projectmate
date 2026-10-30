import { motion } from 'framer-motion';

export const ProjectSkeleton = () => (
  <motion.li
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="animate-pulse list-none border-2 border-[#0f0f0f] bg-white p-5 shadow-[4px_4px_0_0_#0f0f0f] md:p-6"
  >
    <div className="flex h-full flex-col justify-center space-y-2">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="h-7 w-36 bg-gray-200" />
          <div className="h-5 w-24 bg-gray-200" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-full bg-gray-200" />
          <div className="h-4 w-32 bg-gray-200" />
        </div>
        <div>
          <div className="h-3 w-full bg-gray-200" />
          <div className="mt-3 h-3 w-full bg-gray-200" />
          <div className="mt-3 h-3 w-full bg-gray-200" />
          <div className="mt-3 h-3 w-56 bg-gray-200" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="mt-1 flex space-x-2 pb-2 md:pb-0">
            <div className="h-5 w-12 bg-gray-200 px-2 py-1" />
            <div className="h-5 w-12 bg-gray-200 px-2 py-1" />
            <div className="h-5 w-12 bg-gray-200 px-2 py-1" />
            <div className="h-5 w-12 bg-gray-200 px-2 py-1" />
          </div>
          <div className="mt-1 flex justify-between space-x-2 pb-2 md:pb-0">
            <div className="flex space-x-2">
              <div className="h-8 w-16 bg-gray-200 px-2 py-1" />
              <div className="h-8 w-16 bg-gray-200 px-2 py-1" />
            </div>
            <div className="h-8 w-16 bg-gray-200 px-2 py-1" />
          </div>
        </div>
      </div>
    </div>
  </motion.li>
);
