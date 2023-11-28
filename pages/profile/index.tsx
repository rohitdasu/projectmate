import React from 'react';
import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts';
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
  const { data: profileDetails, isLoading: isDetailsLoading } = useSWR(
    userDetailsUrl,
    fetcher
  );
  const { data: projectDetails, isLoading: isProjectsLoading } = useSWR(
    userProjectsUrl,
    fetcher
  );

  return (
    <>
      <header className="sr-only">
        <h1>Profile</h1>
      </header>
      <SharedLayout title="Profile">
        <div className="flex h-full w-full flex-col items-center">
          <ProfilePage
            details={profileDetails}
            projects={projectDetails}
            profile={data}
            isProjectsLoading={isProjectsLoading}
            isDetailsLoading={isDetailsLoading}
            isGoogleLoading={status === 'loading' ? true : false}
          />
        </div>
      </SharedLayout>
    </>
  );
};

export default Profile;
