import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { Project } from '@/components/Profile/Project';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Lottie from 'lottie-react';
import Loader from '@/../public/loading.json';

const Profile: NextPage = () => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/');
    },
  });

  const projects = [
    {
      id: '1',
      title: 'Projectmate',
    },
    {
      id: '2',
      title: 'Appwrite',
    },
    {
      id: '3',
      title: 'Linktree',
    },
    {
      id: '4',
      title: 'Docker',
    },
  ];

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Lottie animationData={Loader} />
      </div>
    );
  }

  return (
    <SharedLayout title="Profile" hasContainer>
      <div className="m-auto flex w-full flex-col px-4 py-5">
        <h1 className="text-xl font-semibold dark:text-[#a6a6a6] sm:text-[30px]">
          <span>Welcome back, </span>
          <span className="mr-2 whitespace-nowrap  text-[#ED8728] dark:text-white">
            {session?.user && session.user.name}
          </span>
          🎉
        </h1>
        <h2 className="pt-10 font-semibold dark:text-[#a6a6a6] sm:text-lg">
          Your Projects
        </h2>
        <div className="grid auto-rows-auto gap-5 pt-5 dark:text-[#B7C2D1] sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {projects &&
            projects.map((item) => {
              return <Project key={item.id} title={item.title} id={item.id} />;
            })}
        </div>
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
