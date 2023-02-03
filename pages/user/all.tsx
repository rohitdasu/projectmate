import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { NextPage } from 'next';
import { Typography } from '@/components/Typography';
import { People } from '@/components/People';
import axios from 'axios';
import useSWR from 'swr';
import Loader from 'public/animations/loading.json';
import Lottie from 'lottie-react';

const All: NextPage = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url = `/api/user/all`;
  const { data } = useSWR(url, fetcher);
  const { results: users } = data || [];

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Lottie animationData={Loader} />
      </div>
    );
  }

  return (
    <SharedLayout title="Profile" hasContainer>
      <div className="m-auto flex w-full flex-col px-4 pt-6 pb-8">
        <Typography
          as="h1"
          fontSize="xl"
          fontWeight="semibold"
          className="text-[#a6a6a6] sm:text-[30px]"
        >
          <span className="text-gray-100">Mates</span>
        </Typography>
      </div>
      <div className="mb-8">
        <People data={users} />
      </div>
    </SharedLayout>
  );
};

export default All;
