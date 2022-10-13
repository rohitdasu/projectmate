import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BsFillBookmarkDashFill } from 'react-icons/bs';
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
          <span className="whitespace-nowrap text-[#ED8728]  dark:text-white">
            {session?.user && session.user.name}&nbsp;🎉
          </span>
        </h1>
        <h2 className="pt-10 font-semibold dark:text-[#a6a6a6] sm:text-lg">
          Your Projects
        </h2>
        <div className="grid auto-rows-auto gap-5 pt-5 dark:text-[#B7C2D1] sm:grid sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex w-full flex-row items-center justify-between rounded-lg p-4 shadow-border-shadow dark:bg-[#232931]">
            <p className="text-sm sm:text-base">Projectmate</p>
            <div className="flex flex-row">
              <button className="p-3 transition-all hover:opacity-70">
                <FaEdit />
              </button>
              <button className="p-3 transition-all hover:opacity-70">
                <FaTrash />
              </button>
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between rounded-lg p-4 shadow-border-shadow dark:bg-[#232931]">
            <p className="text-sm sm:text-base">React</p>
            <div className="flex flex-row">
              <button className="p-3 transition-all hover:opacity-70">
                <FaEdit />
              </button>
              <button className="p-3 transition-all hover:opacity-70">
                <FaTrash />
              </button>
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between rounded-lg p-4 shadow-border-shadow dark:bg-[#232931]">
            <p className="text-sm sm:text-base">Dribble</p>
            <div className="flex flex-row">
              <button className="p-3 transition-all hover:opacity-70">
                <FaEdit />
              </button>
              <button className="p-3 transition-all hover:opacity-70">
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
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
        </div>
      </div>
    </SharedLayout>
  );
};

export default Profile;
