import React, { useState } from 'react';
import Image from 'next/image';

export const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div className="my-2 mx-2 md:mx-auto px-2 md:w-1/2 z-[999] bg-white rounded-md shadow-md flex items-center space-x-2">
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
        className="p-2 bg-transparent outline-none flex-1 "
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
  );
};
