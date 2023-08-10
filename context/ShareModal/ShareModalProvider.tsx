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

  const openModal = (data: ShareModalData) =>
    dispatch({ type: 'OPEN_MODAL', data });

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  return (
    <ShareModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </ShareModalContext.Provider>
  );
};
