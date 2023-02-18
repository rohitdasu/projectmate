export type EditableUserDetails = {
  title: string;
  description: string;
  skills: string[];
};

export type EditProfileFormProps = {
  currentTitle: string | undefined;
  currentDescription: string | undefined;
  currentSkills?: string[] | undefined;
};
