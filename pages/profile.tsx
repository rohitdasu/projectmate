import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

const Profile: NextPage = () => {
  const { data: session } = useSession();
  return (
    <SharedLayout title="Profile">
      <div className="m-auto flex w-full flex-col px-4 py-5">
        <h1 className="text-xl font-semibold dark:text-[#a6a6a6] sm:text-[30px]">
          Welcome back,&nbsp;
          <span className="text-[#ED8728] dark:text-white">
            {session?.user && session.user.name}&nbsp;🎉
          </span>
        </h1>
        <h2 className="pt-10 font-semibold dark:text-[#a6a6a6] sm:text-lg">
          Your Projects
        </h2>
        <div className="grid auto-rows-auto gap-5 pt-5 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="w-full rounded-lg bg-gray-600 p-5 text-white dark:text-[#B7C2D1]">
            <p className="text-sm sm:text-base">Your Project</p>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};

export default Profile;
