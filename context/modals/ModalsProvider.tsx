import { FC, ReactNode, useReducer } from 'react';
import { ModalsContext, initialModalsState } from './ModalsContext';
import { modalsReducer } from './reducers';
import { ModalType, ShareData } from './types';

export const ModalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(modalsReducer, initialModalsState);

  const openModal = (modal: ModalType) => {
    dispatch({ type: 'OPEN_MODAL', modal });
  };

  const closeModal = (modal: ModalType) => {
    dispatch({ type: 'CLOSE_MODAL', modal });
  };

  const setShareData = (data: ShareData) => {
    dispatch({ type: 'SET_SHARE_DATA', data });
  };

  return (
    <ModalsContext.Provider
      value={{ state, openModal, closeModal, setShareData }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
