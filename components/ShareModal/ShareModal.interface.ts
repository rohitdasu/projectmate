export type ShareProjectData = {
  projectTitle: string;
  projectUrl: string;
};

export interface ShareModalProps {
  isOpen: boolean;
  closeModal: () => void;
  shareProjectData: ShareProjectData;
}
