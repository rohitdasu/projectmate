import React, { useState } from 'react';
import Image from 'next/image';

export const SearchProject = () => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <form className=" my-2  px-2  lg:w-[670px] w-[90%]  z-[999] bg-white rounded-md shadow-md flex items-center space-x-2 mx-auto">
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
    </form>
  );
};
