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
    <div className="fixed bottom-0 right-0 z-50 m-5 text-orange-500 dark:text-orange-200">
      <button
        className="mx-auto rounded-full border border-orange-500 bg-orange-100 p-4 font-semibold hover:bg-[rgba(0,0,0,0.1)] dark:border-orange-200 dark:bg-[rgba(255,255,255,0.1)]"
        onClick={handleClick}
      >
        <FaArrowUp className="2-xl" />
      </button>
    </div>
  );
};
