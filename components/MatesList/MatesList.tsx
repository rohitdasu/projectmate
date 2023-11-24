import React from 'react';
import { Mate } from './Mate';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Loader } from 'lucide-react';
import { MateProps } from './Mate.interface';

export const MatesList = () => {
  const url = `/api/user/all`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) {
    return <div className="m-auto my-5 text-lg">Failed to load mates</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-16 px-2">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        <ul className="grid grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {data &&
            data.results.map((mate: MateProps) => {
              return <Mate key={mate.id} {...mate} />;
            })}
        </ul>
      </div>
    </section>
  );
};
