export type AddProjectModalState = {
  isOpen: boolean;
  randomKey: string;
};

export type AddProjectModalActions =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_KEY'; randomKey: string };
