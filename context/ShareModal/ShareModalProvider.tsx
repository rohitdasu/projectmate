import { FC, PropsWithChildren, useReducer } from 'react';
import { ShareModalData, ShareModalState } from './types';
import { ShareModalContext } from './ShareModalContext';
import { shareModalReducer } from './reducers';

const initialShareModalState: ShareModalState = {
  isOpen: false,
  data: {
    url: '',
    title: '',
  },
};

export const ShareModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(
    shareModalReducer,
    initialShareModalState
  );

  const openModal = () => dispatch({ type: 'OPEN_MODAL' });

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  const setModalData = (data: ShareModalData) =>
    dispatch({ type: 'SET_MODAL_DATA', data });

  return (
    <ShareModalContext.Provider
      value={{ state, openModal, closeModal, setModalData }}
    >
      {children}
    </ShareModalContext.Provider>
  );
};
