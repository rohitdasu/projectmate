export type ShareModalData = {
  url: string;
  title: string;
};

export type ShareModalState = {
  isOpen: boolean;
  data: ShareModalData;
};

export type ShareModalActions =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_MODAL_DATA'; data: ShareModalData };
