export type ShareModalData = {
  url: string;
  title: string;
};

export type ShareModalState = {
  isOpen: boolean;
  data: ShareModalData;
};

export type ShareModalActions =
  | { type: 'OPEN_MODAL'; data: ShareModalData }
  | { type: 'CLOSE_MODAL' };
