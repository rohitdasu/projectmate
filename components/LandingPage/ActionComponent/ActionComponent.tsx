import React from 'react';

export const ActionComponent = () => {
  return (
    <section className="bg-green-400 py-16 px-2">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8">
        <p className="w-full text-center text-base leading-[1.25] text-green-900 md:w-3/4 lg:w-2/3 lg:text-3xl">
          Join the ranks of 150+ talented developers who have already signed up
          for projectmate.net
        </p>
        <button className="rounded-md bg-green-100 py-2 px-4 text-sm font-medium text-green-900 hover:bg-green-200 md:text-base lg:py-3 lg:px-8">
          Sign Up
        </button>
      </div>
    </section>
  );
};
