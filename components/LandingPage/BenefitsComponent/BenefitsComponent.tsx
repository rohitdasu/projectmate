import React from 'react';
import { benefits } from './data';
import { Benefit } from './Benefit';

export const BenefitsComponent = () => {
  return (
    <section className="bg-secondary-background py-16 px-4">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        <h2 className="text-center text-xl text-gray-200 md:text-left lg:text-4xl">
          What are the benefits?
        </h2>
        <p className="w-full text-center text-base text-gray-400 md:w-2/3 md:text-left lg:w-1/2">
          From connecting with like-minded developers to finding new projects,
          see how projectmate can benefit you
        </p>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-8">
          {benefits.map((benefit) => {
            return <Benefit key={benefit.id} {...benefit} />;
          })}
        </ul>
      </div>
    </section>
  );
};
