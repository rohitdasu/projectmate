export type UserDetails = {
  title: string;
  description: string;
  skills: string[];
  numberOfProjects: number;
};

export type EditProfileModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  currentTitle: string;
  currentDescription: string;
  currentSkills: string[];
};

export type EditableUserDetails = Omit<UserDetails, 'numberOfProjects'>;
