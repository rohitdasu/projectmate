import React from 'react';
import { Mate } from './Mate';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { MateProps } from './Mate.interface';
import { MateSkeleton } from './MateSkeleton';

export const MatesList = () => {
  const url = `/api/user/all`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Failed to load mates</p>
      </div>
    );
  }

  return (
    <section className="px-2 py-6 md:py-12">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        <ul className="grid grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {isLoading && (
            <>
              {Array.from({ length: 30 }).map((_, index) => (
                <MateSkeleton key={index} />
              ))}
            </>
          )}
          {data &&
            data.results.map((mate: MateProps) => {
              return <Mate key={mate.id} {...mate} />;
            })}
        </ul>
      </div>
    </section>
  );
};
