import React from 'react';
import { Mate } from './Mate';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const MatesList = () => {
  const url = `/api/user/all`;
  const { data, error } = useSWR(url, fetcher);

  if (error) {
    return <div className="m-auto my-5 text-lg">Failed to load mates</div>;
  }

  return (
    <section className="py-16 px-2">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        <ul className="grid grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {data &&
            data.results.map((mate: any) => {
              return <Mate key={mate.id} {...mate} />;
            })}
        </ul>
      </div>
    </section>
  );
};
