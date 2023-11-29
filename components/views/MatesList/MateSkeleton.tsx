import React from 'react';

export const MateSkeleton = () => {
  return (
    <li className="animate-pulse">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="h-16 w-16 rounded-full bg-gray-700" />
        <div className="h-4 w-16 bg-gray-700" />
      </div>
    </li>
  );
};
