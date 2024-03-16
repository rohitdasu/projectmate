import React, { useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { fetcher } from '@/lib/fetcher';
import { MateProps } from './Mate.interface';
import { MateSkeleton } from './MateSkeleton';
import { ErrorPage } from '@/components/Common/Error';
import { Mate } from './Mate';
import useSWRInfinite from 'swr/infinite';

export const MatesList = () => {
  const getKey = (pageIndex: number, previousPageData: MateProps[]) => {
    let cursorId = '';
    if (previousPageData) {
      const lastMate = previousPageData[previousPageData.length - 1];
      if (!lastMate) return null;
      cursorId = lastMate.id;
    }

    if (pageIndex === 0) return `/api/user/all`;

    return `/api/user/all?cursorId=${cursorId}&limit=15`;
  };

  const { data, size, setSize, error, isLoading } = useSWRInfinite<MateProps[]>(
    getKey,
    fetcher
  );

  const numberOfSKeletonPost = 15;
  const skeletonMatesToLoad = Array.from({ length: numberOfSKeletonPost }, () =>
    (Math.random() + 1).toString(36).substring(7)
  );

  const paginatedMates = data?.flat();

  const isLoadingMore = data && typeof data[size - 1] === 'undefined';
  const isNotReachEnd = data && data[data.length - 1].length;

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (isNotReachEnd) {
          setSize(size + 1);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isNotReachEnd, setSize, size]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <section className="px-2 py-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className="mx-auto flex max-w-screen-xl flex-col gap-8"
      >
        <ul className="grid grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {isLoading && (
            <>
              {Array.from({ length: 30 }).map((_, index) => (
                <MateSkeleton key={index} />
              ))}
            </>
          )}
          {paginatedMates &&
            paginatedMates?.map((mate: MateProps) => {
              return (
                <li key={mate.id}>
                  <Mate {...mate} />
                </li>
              );
            })}
          {paginatedMates && paginatedMates.length === 0 && !isLoading && (
            <div className="flex h-dvh items-center justify-center text-xl">
              No Data
            </div>
          )}
          {data && isLoadingMore && isNotReachEnd ? (
            skeletonMatesToLoad.map((randomKey) => (
              <MateSkeleton key={randomKey} />
            ))
          ) : (
            <></>
          )}
        </ul>
      </motion.div>
    </section>
  );
};
