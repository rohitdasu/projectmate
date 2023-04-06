import React from 'react';

export const SuccessStoryComponent = () => {
  return (
    <section className="mx-auto flex max-w-screen-xl flex-col items-center gap-6 py-16">
      <p className="text-xl text-gray-200 md:text-3xl lg:text-4xl">
        ProductHunt Success Story
      </p>
      <p className="text-lg text-gray-300 md:text-xl lg:text-2xl">
        Our app ranks <span className="text-green-400">#12</span> on{' '}
        <span className="text-green-400">ProductHunt</span> 🎉
      </p>
    </section>
  );
};
