import { Project as ProjectData } from '@prisma/client';

export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string | null;
  liked: boolean;
  likesCount: number;
  createdAt: Date;
};

export interface IProject extends ProjectData {
  length: number;
  author: {
    name: string;
  };
}
