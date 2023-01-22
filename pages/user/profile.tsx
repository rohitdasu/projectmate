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
        <Typography
          as="h1"
          fontSize="xl"
          fontWeight="semibold"
          className="dark:text-[#a6a6a6] sm:text-[30px]"
        >
          <span className="text-gray-900 dark:text-gray-100">Hi, </span>
          <span className="mr-2 whitespace-nowrap text-primary-1">
            {session?.user && session.user.name}
          </span>
          🎉
        </Typography>
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
            projects.map((item: { id: string; title: string }) => {
              return <Project key={item.id} title={item.title} id={item.id} />;
            })}
        </ul>
        {projects && projects.length === 0 && (
          <div className="flex h-[calc(100vh-244px)] items-center justify-center">
            <Lottie animationData={animation} style={style} />
          </div>
        )}
        {error && <Lottie animationData={errorAnimation} style={style} />}
        {/*
        will do this part when we have bookmarks section in our BE
         <h2 className="pt-10 font-semibold dark:text-[#a6a6a6] sm:text-lg">
          Bookmarks
        </h2>
        <div className="grid auto-rows-auto gap-5 pt-5 dark:text-[#B7C2D1] sm:grid sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative h-96 w-full rounded-lg shadow-border-shadow dark:bg-[#232931] sm:max-w-2xl">
            <button className="absolute top-5 right-4 p-3 transition-all hover:opacity-70">
              <BsFillBookmarkDashFill />
            </button>
          </div>
          <div className="relative h-96 w-full rounded-lg shadow-border-shadow dark:bg-[#232931] sm:max-w-2xl">
            <button className="absolute top-5 right-4 p-3 transition-all hover:opacity-70">
              <BsFillBookmarkDashFill />
            </button>
          </div>
          <div className="relative h-96 w-full rounded-lg shadow-border-shadow dark:bg-[#232931] sm:max-w-2xl">
            <button className="absolute top-5 right-4 p-3 transition-all hover:opacity-70">
              <BsFillBookmarkDashFill />
            </button>
          </div>
        </div> */}
      </div>
    </SharedLayout>
  );
};

export default Profile;
