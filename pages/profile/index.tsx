import React from 'react';
import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ProfilePage } from '@/components/views/ProfilePage';

const Profile: NextPage = () => {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/');
    },
  });

  return (
    <>
      <header className="sr-only">
        <h1>Profile</h1>
      </header>
      <SharedLayout title="Profile">
        <div className="flex h-full w-full flex-col items-center">
          {status === 'loading' && <Loader className="animate-spin" />}
          <ProfilePage profile={data} />
        </div>
      </SharedLayout>
    </>
  );
};

export default Profile;
