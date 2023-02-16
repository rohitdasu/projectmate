export type UserDetails = {
  title: string;
  description: string;
  skills: string[];
  numberOfProjects: number;
};

export type EditableUserDetails = Omit<UserDetails, 'numberOfProjects'>;
