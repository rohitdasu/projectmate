import { useContext } from 'react';
import { AddProjectModalContext } from '@/context/AddProjectModal/AddProjectModalContext';

export const useAddProjectModal = () => {
  const context = useContext(AddProjectModalContext);

  if (!context) {
    throw new Error(
      'useAddProjectModal needs to be used within a AddProjectModalProvider'
    );
  }

  return context;
};
