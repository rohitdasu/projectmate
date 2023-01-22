import { Project as ProjectData } from '@prisma/client';
import { KeyedMutator } from 'swr';

export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string | null;
  liked: boolean;
  likesCount: number;
  mutate: KeyedMutator<IProject[]>;
};

export interface IProject extends ProjectData {
  author: {
    name: string;
  };
}
