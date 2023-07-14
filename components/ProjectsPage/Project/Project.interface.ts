import { Project as ProjectData } from '@prisma/client';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string | null;
  authorImage: string | null;
  createdAt: Date;
  githubRepository: string;
  openShareModal: (text: string, url: string) => void;
}

export interface IProject extends ProjectData {
  author: {
    name: string;
    image: string;
  };
}
