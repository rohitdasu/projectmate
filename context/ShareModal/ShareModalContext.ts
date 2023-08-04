import { createContext } from 'react';
import { ShareModalState, ShareModalData } from './types';

export const ShareModalContext = createContext<
  | {
      state: ShareModalState;
      openModal: () => void;
      closeModal: () => void;
      setModalData: (data: ShareModalData) => void;
    }
  | undefined
>(undefined);
