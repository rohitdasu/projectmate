import { AuthModalState } from './types';
import { createContext } from 'react';

export const AuthModalContext = createContext<
  | {
      state: AuthModalState;
      openModal: () => void;
      closeModal: () => void;
    }
  | undefined
>(undefined);
