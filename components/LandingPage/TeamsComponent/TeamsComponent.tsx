import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { ContributorList } from '@/components';

export const TeamsComponent = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(
    'https://api.github.com/repos/rohitdasu/projectmate/contributors',
    fetcher
  );
  return (
    <section className="py-16">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        <p className="text-4xl text-gray-200">Contributors</p>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
          <ContributorList contributors={data} />
        </ul>
      </div>
    </section>
  );
};
