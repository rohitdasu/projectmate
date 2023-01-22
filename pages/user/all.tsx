import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { NextPage } from 'next';
import { Typography } from '@/components/Typography';
import { People } from '@/components/People';
import axios from 'axios';
import useSWR from 'swr';

const All: NextPage = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url = `/api/user/all`;
  const { data } = useSWR(url, fetcher);
  const { results: users } = data || [];

  return (
    <SharedLayout title="Profile" hasContainer>
      <div className="m-auto flex w-full flex-col px-4 pt-6 pb-8">
        <Typography
          as="h1"
          fontSize="xl"
          fontWeight="semibold"
          className="dark:text-[#a6a6a6] sm:text-[30px]"
        >
          <span className="text-gray-900 dark:text-gray-100">Mates</span>
        </Typography>
      </div>
      <div className="mb-8">
        <People data={users} />
      </div>
    </SharedLayout>
  );
};

export default All;
