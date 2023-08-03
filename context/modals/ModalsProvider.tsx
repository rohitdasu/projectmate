import { FC, ReactNode, useReducer } from 'react';
import { ModalsContext, initialModalsState } from './ModalsContext';
import { modalsReducer } from './reducers';
import { ModalType } from './types';

export const ModalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(modalsReducer, initialModalsState);

  const openModal = (modal: ModalType) => {
    dispatch({ type: 'OPEN_MODAL', modal });
  };

  const closeModal = (modal: ModalType) => {
    dispatch({ type: 'CLOSE_MODAL', modal });
  };

  return (
    <ModalsContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </ModalsContext.Provider>
  );
};
