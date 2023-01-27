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
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/');
    },
  });

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url = `/api/user/project`;
  const { data, error } = useSWR(url, fetcher);
  const { results: projects } = data || [];
  console.log(projects);

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

  return (
    <SharedLayout title="Profile" hasContainer>
      <div className="m-auto flex w-full flex-col px-4 py-6 pb-16">
        <ProfileHeader />
        <Typography
          as="h2"
          fontWeight="semibold"
          className="pt-10 font-medium text-gray-900 dark:text-gray-100 sm:text-lg"
        >
          Your Projects
        </Typography>
        <ul className="grid auto-rows-auto gap-5 pt-5 dark:text-[#B7C2D1] sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {projects &&
            projects.length > 0 &&
            projects.map(
              (item: {
                id: string;
                title: string;
                description: string;
                tags: Array<string>;
              }) => {
                return (
                  <Project
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    description={item.description}
                    tags={item.tags}
                  />
                );
              }
            )}
        </ul>
        {projects && projects.length === 0 && (
          <div className="flex h-[calc(100vh-244px)] items-center justify-center">
            <Lottie animationData={animation} style={style} />
          </div>
        )}
        {error && <Lottie animationData={errorAnimation} style={style} />}
      </div>
    </SharedLayout>
  );
};

export default Profile;
