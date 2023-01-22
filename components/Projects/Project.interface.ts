import { Project as ProjectData } from '@prisma/client';

export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string | null;
  liked: boolean;
  likesCount: number;
  likeProject: (projectId: string) => Promise<void>;
  unlikeProject: (projectId: string) => Promise<void>;
};

export interface IProject extends ProjectData {
  author: {
    name: string;
  };
}
