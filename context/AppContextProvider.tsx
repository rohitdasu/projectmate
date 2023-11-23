import { ShareModalProvider } from './ShareModal/ShareModalProvider';
import { AuthModalProvider } from './AuthModal/AuthModalProvider';
import { AddProjectModalProvider } from './AddProjectModal/AddProjectModalProvider';
import { combineProviders } from '@/lib/combineProviders';

const providers = [
  ShareModalProvider,
  AuthModalProvider,
  AddProjectModalProvider,
];

export const AppContextProvider = combineProviders(providers);
