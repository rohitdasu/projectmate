import React from 'react';

export const MateSkeleton = () => {
  return (
    <li className="animate-pulse list-none border-2 border-[#0f0f0f] bg-white p-4 shadow-[3px_3px_0_0_#0f0f0f]">
      <div className="flex min-h-36 flex-col items-center justify-center gap-3">
        <div className="h-16 w-16 rounded-full border-2 border-[#0f0f0f] bg-gray-200" />
        <div className="h-4 w-24 bg-gray-200" />
        <div className="h-3 w-16 bg-gray-100" />
      </div>
    </li>
  );
};
