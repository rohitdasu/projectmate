import { useRouter } from 'next/router';
import { SharedLayout } from '@/components/Layouts';
import { fetcher } from '@/lib/fetcher';
import useSWR, { mutate } from 'swr';
import { ProfilePage } from '@/components/views/ProfilePage';
import { useSession } from 'next-auth/react';

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
  } = useSWR(userDetailsUrl, fetcher);
  const {
    data: projectDetails,
    isLoading: isProjectsLoading,
    error: isProjectsError,
  } = useSWR(userProjectsUrl, fetcher);

  const handleProfileEditSuccess = () => {
    mutate(userDetailsUrl);
  };

  if (isProfileError || isProjectsError) {
    router.replace('/404');
  }

  return (
    <>
      <header className="sr-only">
        <h1>Profile</h1>
      </header>
      <SharedLayout title="Profile">
        <div className="flex h-full w-full flex-col items-center overflow-hidden">
          <ProfilePage
            currentUser={currentUser}
            isCurrentUserLoading={isCurrentUserLoading === 'loading'}
            projects={projectDetails}
            profile={profileDetails}
            isProjectsLoading={isProjectsLoading}
            isProfileLoading={isDetailsLoading}
            onProfileEditSuccess={handleProfileEditSuccess}
          />
        </div>
      </SharedLayout>
    </>
  );
};

export default UserProfile;
