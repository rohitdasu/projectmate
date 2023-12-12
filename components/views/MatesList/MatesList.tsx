import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { MateProps } from './Mate.interface';
import { MateSkeleton } from './MateSkeleton';
import { ErrorPage } from '@/components/Common/Error';
import { Mate } from './Mate';

export const MatesList = () => {
  const url = `/api/user/all`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) {
    return <ErrorPage />;
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
              return (
                <motion.li
                  key={mate.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                >
                  <Mate {...mate} />
                </motion.li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};
