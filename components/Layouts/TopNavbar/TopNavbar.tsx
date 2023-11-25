import Link from 'next/link';
import React from 'react';

export const TopNavbar = () => {
  return (
    <div className="flex h-14 flex-row items-center justify-between px-4">
      <Link href={'/'}>
        <p className="font-semibold uppercase">projectmate</p>
      </Link>
    </div>
  );
};
