import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

const useGetAllTags = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/tags`, fetcher);

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
};

export default useGetAllTags;
