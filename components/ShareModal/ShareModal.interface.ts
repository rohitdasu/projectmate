export type ShareProjectData = {
  projectTitle: string;
  projectUrl: string;
};

export type ShareModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  shareProjectData: ShareProjectData;
};
