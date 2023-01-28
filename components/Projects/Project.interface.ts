import { Project as ProjectData } from '@prisma/client';

export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string | null;
  createdAt: Date;
};

export interface IProject extends ProjectData {
  author: {
    name: string;
  };
}
