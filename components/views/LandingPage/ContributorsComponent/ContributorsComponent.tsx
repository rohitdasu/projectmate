import React from 'react';
import { Contributor as ContributorType } from './ContributorsComponent.interface';
import { Contributor } from './Contributor';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const ContributorsComponent = () => {
  const url = `https://api.github.com/repos/rohitdasu/projectmate/contributors`;
  const { data, error } = useSWR(url, fetcher);

  if (error) {
    return <></>;
  }

  return (
    <section className="py-16 px-4 md:py-32 md:px-8 xl:px-0">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        <p className="text-center text-xl text-gray-900 dark:text-gray-300 md:text-3xl lg:text-4xl">
          Contributors
        </p>
        <ul className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
          {data?.map((contributor: ContributorType) => {
            return <Contributor key={contributor.id} {...contributor} />;
          })}
        </ul>
      </div>
    </section>
  );
};
