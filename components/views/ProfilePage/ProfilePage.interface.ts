import { Session } from 'next-auth';
import { EditableUserDetails } from '@/pages/api/user/details';

export interface ProfilePageProps {
  profile: ProfileDetails;
  projects?: ProjectDetails;
  isProjectsLoading: boolean;
  isProfileLoading: boolean;
  currentUser?: Session | null;
  isCurrentUserLoading?: boolean;
  onProfileEditSuccess: () => void;
}

type ProjectDetails = {
  message: string;
  results: Array<Project>;
  success: boolean;
};

type ProfileDetails = {
  message: string;
  results: EditableUserDetails;
  success: boolean;
};

type Project = {
  authorId: string;
  description: string;
  githubRepository: string;
  tags: Array<string>;
  title: string;
  updatedAt: string;
  liveUrl: string;
};
