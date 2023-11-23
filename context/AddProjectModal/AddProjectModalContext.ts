import { createContext } from 'react';
import { AddProjectModalState } from './types';

export const AddProjectModalContext = createContext<
  | {
      state: AddProjectModalState;
      openModal: () => void;
      closeModal: () => void;
    }
  | undefined
>(undefined);
