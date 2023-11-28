import React from 'react';
import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ProfilePage } from '@/components/views/ProfilePage';
import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

const userDetailsUrl = `/api/user/details`;
const userProjectsUrl = `/api/user/project`;

const Profile: NextPage = () => {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/');
    },
  });

  const { data: profileDetails } = useSWR(userDetailsUrl, fetcher);
  const { data: projectDetails } = useSWR(userProjectsUrl, fetcher);

  return (
    <>
      <header className="sr-only">
        <h1>Profile</h1>
      </header>
      <SharedLayout title="Profile">
        <div className="flex h-full w-full flex-col items-center">
          {status === 'loading' && <Loader className="animate-spin" />}
          <ProfilePage
            details={profileDetails}
            projects={projectDetails}
            profile={data}
          />
        </div>
      </SharedLayout>
    </>
  );
};

export default Profile;
