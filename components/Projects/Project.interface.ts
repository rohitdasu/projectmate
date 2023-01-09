export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string | null;
  liked: boolean;
  likesCount: number;
};
