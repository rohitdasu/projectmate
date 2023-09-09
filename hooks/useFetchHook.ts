import { IProject } from '@/components/ProjectsPage/ProjectsList';
import { fetcher } from '@/lib/fetcher';
import { useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export const useFetchPaginatedData = (url: string) => {
  const selectedTags: string[] = useMemo(() => [], []);

  const getKey = (pageIndex: number, previousPageData: IProject[]) => {
    let cursorId = '';
    if (previousPageData) {
      const lastProject = previousPageData[previousPageData.length - 1];
      if (!lastProject) return null;
      cursorId = lastProject.id;
    }

    if (pageIndex === 0) return `${url}`;

    return `${url}?cursorId=${cursorId}`;
  };

  const { data, size, setSize, error, isLoading, mutate } = useSWRInfinite<
    IProject[]
  >(getKey, fetcher);

  // Generate array of specified length with random key value
  const numberOfSKeletonPost = 4;
  const skeletonProjectsToLoad = Array.from(
    { length: numberOfSKeletonPost },
    () => (Math.random() + 1).toString(36).substring(7)
  );

  const paginatedProjects = data?.flat();

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

  const filteredProjects = useMemo(() => {
    if (!paginatedProjects?.length) {
      return [];
    }
    if (!selectedTags?.length) {
      return paginatedProjects;
    }

    return paginatedProjects.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag))
    );
  }, [paginatedProjects, selectedTags]);

  return {
    data,
    isNotReachEnd,
    error,
    isLoading,
    mutate,
    skeletonProjectsToLoad,
    isLoadingMore,
    filteredProjects,
  };
};
