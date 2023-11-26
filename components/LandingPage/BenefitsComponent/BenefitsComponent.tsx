import React from 'react';
import { benefits } from './data';
import { Benefit } from './Benefit';

export const BenefitsComponent = () => {
  return (
    <section className="bg-secondary-background py-16 px-4">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        <div className="flex justify-center pb-8">
          <h2 className="text-center text-xl text-gray-900 dark:text-gray-300 md:text-left lg:text-4xl">
            What are the benefits?
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-8">
          {benefits.map((benefit) => {
            return <Benefit key={benefit.id} {...benefit} />;
          })}
        </ul>
      </div>
    </section>
  );
};
