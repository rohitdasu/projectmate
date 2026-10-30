import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { fetcher } from '@/lib/fetcher';
import { MateProps } from './Mate.interface';
import { MateSkeleton } from './MateSkeleton';
import { ErrorPage } from '@/components/Common/Error';
import { Mate } from './Mate';
import useSWRInfinite from 'swr/infinite';

export const MatesList = () => {
  const [searchQuery, setSearchQuery] = useState('');
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
  const isNotReachEnd = data && (data[data.length - 1]?.length ?? 0) > 0;

  const filteredMates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return (paginatedMates ?? []).filter((mate) =>
      `${mate.name} ${mate.username ?? ''}`.toLowerCase().includes(query)
    );
  }, [paginatedMates, searchQuery]);

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
    <section className="min-h-screen bg-[#f8f9fa] px-4 py-8 text-[#0f0f0f] md:px-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className="mx-auto flex max-w-7xl flex-col gap-8"
      >
        <header className="flex flex-col gap-6 border-b-2 border-[#0f0f0f] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0044ff]">
              Meet the community
            </p>
            <h1 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
              Open-source mates
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              Find makers, explore their work, and connect with people building
              in the open.
            </p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <label
              htmlFor="mate-search"
              className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500"
            >
              Search members
            </label>
            <Search
              className="absolute left-3 top-[calc(50%+8px)] -translate-y-1/2 text-gray-500"
              size={18}
              aria-hidden="true"
            />
            <input
              id="mate-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Name or username"
              className="w-full border-2 border-[#0f0f0f] bg-white py-3 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-gray-500 focus:border-[#0044ff]"
            />
          </div>
        </header>
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <p className="font-display text-sm font-bold uppercase tracking-wide">
            <Users className="mr-2 inline-block" size={17} aria-hidden="true" />
            {isLoading
              ? 'Loading community'
              : `${filteredMates.length} members shown`}
          </p>
          {searchQuery ? (
            <button
              type="button"
              className="text-xs font-bold uppercase text-[#0044ff] underline underline-offset-4"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </button>
          ) : null}
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => (
              <MateSkeleton key={index} />
            ))}
          {!isLoading &&
            filteredMates.map((mate: MateProps) => (
              <li key={mate.id}>
                <Mate {...mate} />
              </li>
            ))}
          {filteredMates.length === 0 && !isLoading ? (
            <li className="col-span-full border-2 border-dashed border-[#0f0f0f] bg-white px-6 py-14 text-center">
              <p className="font-display text-xl font-black uppercase">
                No members found
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Try another name or username.
              </p>
            </li>
          ) : null}
          {data && isLoadingMore && isNotReachEnd
            ? skeletonMatesToLoad.map((randomKey) => (
                <MateSkeleton key={randomKey} />
              ))
            : null}
        </ul>
      </motion.div>
    </section>
  );
};
