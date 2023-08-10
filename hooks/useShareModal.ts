import { ShareModalContext } from '@/context/ShareModal/ShareModalContext';
import { useContext } from 'react';

export const useShareModal = () => {
  const context = useContext(ShareModalContext);

  if (!context) {
    throw new Error(
      'useShareModal needs to be used within a ShareModalProvider'
    );
  }

  return context;
};
