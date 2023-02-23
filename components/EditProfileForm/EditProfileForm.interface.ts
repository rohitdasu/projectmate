export type EditableUserDetails = {
  title: string;
  description: string;
  skills: string[];
};

export type EditProfileFormProps = {
  currentTitle?: string;
  currentDescription?: string;
  currentSkills?: string[];
};
