import { createContext } from 'react';
import { ShareModalState, ShareModalData } from './types';

export const ShareModalContext = createContext<
  | {
      state: ShareModalState;
      openModal: (data: ShareModalData) => void;
      closeModal: () => void;
    }
  | undefined
>(undefined);
