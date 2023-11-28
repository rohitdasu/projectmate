import { EditableUserDetails } from '@/pages/api/user/details';
import { Session } from 'next-auth';

export interface ProfilePageProps {
  profile: Session | null;
  projects?: ProjectDetails;
  details?: ProfileDetails;
  isProjectsLoading: boolean;
  isDetailsLoading: boolean;
  isGoogleLoading: boolean;
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
};
