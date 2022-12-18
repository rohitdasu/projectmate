import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { ContributorList } from '../ContributorList';

export const About = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data } = useSWR(
    'https://api.github.com/repos/rohitdasu/projectmate/contributors',
    fetcher
  );

  return (
    <div className="py-28 lg:px-4">
      <div className="flex flex-col items-center gap-5 rounded-lg bg-slate-100 py-6 px-4 dark:bg-slate-800 dark:text-slate-300 md:rounded-lg lg:p-12">
        <h2 className="text-center text-2xl font-bold uppercase text-gray-800 dark:text-gray-300 md:text-3xl">
          about us
        </h2>
        <p className="text-light text-md m-auto text-justify text-gray-800 dark:text-gray-300 md:text-lg">
          ProjectMate is a platform built by passionate developers in order to
          make OpenSource accessible for everyone around the world. If this
          sounds interesting to you, we are looking forward to have you on our
          team ! Any contributions you make are greatly appreciated.
        </p>
        <div className="flex-1 lg:w-full"></div>
        <p className="text-md text-center font-bold text-gray-800 dark:text-gray-300 md:text-lg">
          Shout-out to our contributors 🎉
        </p>
        <div className="flex flex-wrap items-center justify-center">
          <ContributorList contributors={data} />
        </div>
      </div>
    </div>
  );
};
