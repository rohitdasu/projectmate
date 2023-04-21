import { Project as ProjectData } from '@prisma/client';

export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string | null;
  authorImage: string | null;
  createdAt: Date;
  githubRepository: string | null;
};

export interface IProject extends ProjectData {
  author: {
    name: string;
    image: string;
  };
}
