import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

const useGetTProjects = (tag: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/tprojectsapi/${tag}`,
    fetcher
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
};

export default useGetTProjects;
