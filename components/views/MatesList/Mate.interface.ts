export interface MateProps {
  id: string;
  name: string;
  profilePicture: string;
  numberOfProjects: number;
  role: string;
  projects: Array<string>;
  username?: string;
}
