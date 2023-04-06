import Link from 'next/link';
import React from 'react';

export const HeroComponent = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-row items-center justify-center px-4 lg:px-0">
      <div className="flex flex-col gap-8">
        <h1 className="mx-auto max-w-5xl text-justify text-xl !leading-[1.25] text-gray-200 md:text-center md:text-3xl lg:text-5xl">
          <span className="text-primary-color">Supercharge</span> your
          open-source contributions with{' '}
          <span className="text-primary-color">projectmate</span>
          .net
        </h1>
        <p className="mx-auto max-w-3xl text-justify text-lg text-gray-400 md:text-center md:text-lg lg:text-xl">
          Discover open-source projects, connect with experienced maintainers,
          and collaborate with a community of passionate contributors. Join over
          150 registered users who are already making a difference
        </p>
        <Link href="/projects" className="text-center">
          <button className="rounded-md bg-green-900 py-3 px-6 text-xs text-green-50 hover:opacity-90 md:text-base">
            Explore Projects
          </button>
        </Link>
      </div>
    </div>
  );
};
