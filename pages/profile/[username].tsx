import { useRouter } from 'next/router';
import { SharedLayout } from '@/components/Layouts';
import { fetcher } from '@/lib/fetcher';
import useSWR, { mutate } from 'swr';
import { ProfilePage } from '@/components/views/ProfilePage';
import { useSession } from 'next-auth/react';
import { ErrorPage } from '@/components/Common/Error';

const UserProfile = () => {
  const { data: currentUser, status: isCurrentUserLoading } = useSession();
  const router = useRouter();
  const { username } = router.query;

  const userDetailsUrl = `/api/user/${username}`;
  const userProjectsUrl = `/api/user/project/${username}`;

  const {
    data: profileDetails,
    isLoading: isDetailsLoading,
    error: isProfileError,
  } = useSWR(userDetailsUrl, fetcher, { errorRetryCount: 0 });
  const {
    data: projectDetails,
    isLoading: isProjectsLoading,
    error: isProjectsError,
  } = useSWR(userProjectsUrl, fetcher, { errorRetryCount: 0 });

  const handleProfileEditSuccess = () => {
    mutate(userDetailsUrl);
  };

  return (
    <>
      <header className="sr-only">
        <h1>Profile of {profileDetails?.results?.name}</h1>
      </header>
      <SharedLayout title={profileDetails?.results?.name || 'Profile'}>
        <div className="flex h-full w-full flex-col items-center overflow-hidden">
          {(isProfileError || isProjectsError) && <ErrorPage />}
          {!isProfileError && !isProjectsError && (
            <ProfilePage
              currentUser={currentUser}
              isCurrentUserLoading={isCurrentUserLoading === 'loading'}
              projects={projectDetails}
              profile={profileDetails}
              error={isProfileError || isProjectsError}
              isProjectsLoading={isProjectsLoading}
              isProfileLoading={isDetailsLoading}
              onProfileEditSuccess={handleProfileEditSuccess}
            />
          )}
        </div>
      </SharedLayout>
    </>
  );
};

export default UserProfile;
