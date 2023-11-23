export type AddProjectModalState = {
  isOpen: boolean;
};

export type AddProjectModalActions =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' };
