import React, { useState } from 'react';
import Image from 'next/image';

export const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div className="container m-auto max-w-screen-xl p-3 py-2 md:p-5">
      <div className="z-[999] mx-2 flex items-center space-x-2 rounded-md border border-[#C9C9C9] bg-white px-4 text-black shadow-md md:mx-auto">
        <Image
          src="/search.svg"
          height={18}
          width={18}
          alt="Search-logo"
          className="cursor-pointer"
        />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Projects"
          className="flex-1 bg-transparent p-2 outline-none "
        />
        {searchInput && (
          <Image
            src="/cross.svg"
            className="cursor-pointer "
            height={25}
            width={25}
            alt="cross-logo"
            onClick={() => setSearchInput('')}
          />
        )}
      </div>
    </div>
  );
};
