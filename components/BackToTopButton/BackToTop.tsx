import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export const BackToTop = () => {
  const handleClick = () => {
    console.log('clicked');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-0 right-0 m-5 text-orange-200 ">
      <button
        className="mx-auto rounded-full border border-orange-200 bg-[rgba(255,255,255,0.1)] p-4 font-semibold"
        onClick={handleClick}
      >
        <FaArrowUp className="2-xl" />
      </button>
    </div>
  );
};
