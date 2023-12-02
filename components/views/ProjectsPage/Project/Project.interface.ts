import { Project as ProjectData } from '@prisma/client';
import { ShareModalData } from '@/context/ShareModal/types';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string | null;
  authorImage: string | null;
  createdAt: Date;
  githubRepository: string;
  liveUrl: string | null;
  username: string;
  openShareModal: (data: ShareModalData) => void;
}

export interface IProject extends ProjectData {
  author: {
    name: string;
    image: string;
    username: string;
  };
}
