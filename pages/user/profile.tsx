import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { Project } from '@/components/Profile/Project';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Lottie from 'lottie-react';
import Loader from 'public/animations/loading.json';
import axios from 'axios';
import useSWR from 'swr';
import animation from '../../public/animations/no-data.json';
import errorAnimation from '../../public/animations/error.json';
import { Typography } from '@/components/Typography';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';

const Profile: NextPage = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/');
    },
  });

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url = `/api/user/project`;
  const { data, error } = useSWR(url, fetcher);
  const { results: projects } = data || [];

  if (status === 'loading' || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Lottie animationData={Loader} />
      </div>
    );
  }

  const style = {
    height: 240,
    width: '100%',
  };

  const UserBio = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <Typography as="p" fontSize="base">
          User Bio Details
        </Typography>
      </div>
    );
  };

  return (
    <SharedLayout title="Profile" hasContainer>
      <div className="m-auto flex w-full flex-col px-4 py-6 pb-16">
        <ProfileHeader />
        <div className="flex w-full flex-col lg:flex-row">
          <div className="top-5 mt-12 mr-5 flex h-96 w-full flex-row justify-center rounded-lg bg-gray-200 p-3 backdrop-blur-sm dark:bg-gray-700 lg:sticky lg:w-[25%]">
            <UserBio />
          </div>
          <div className="w-full lg:w-[75%]">
            <Typography
              as="p"
              fontWeight="semibold"
              className="mt-3 font-medium text-gray-900 dark:text-gray-100 sm:mt-4 sm:text-lg lg:mt-0"
            >
              Your Projects
            </Typography>
            <ul className="grid auto-rows-auto gap-5 pt-5 dark:text-[#B7C2D1] sm:grid md:grid-cols-1 lg:grid-cols-2">
              {projects &&
                projects.length > 0 &&
                projects.map(
                  (item: {
                    id: string;
                    title: string;
                    description: string;
                    tags: Array<string>;
                    createdAt: string;
                  }) => {
                    return (
                      <Project
                        key={item.id}
                        title={item.title}
                        id={item.id}
                        description={item.description}
                        tags={item.tags}
                        createdAt={item.createdAt}
                      />
                    );
                  }
                )}
            </ul>
            {projects && projects.length === 0 && (
              <div className="flex h-96 w-full items-center justify-center rounded-md border border-gray-300 dark:border-gray-700">
                <Lottie animationData={animation} style={style} />
              </div>
            )}
            {error && <Lottie animationData={errorAnimation} style={style} />}
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};

export default Profile;
