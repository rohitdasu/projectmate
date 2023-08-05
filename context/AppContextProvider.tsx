import { ShareModalProvider } from './ShareModal/ShareModalProvider';
import { AuthModalProvider } from './AuthModal/AuthModalProvider';
import { combineProviders } from '@/lib/combineProviders';

const providers = [ShareModalProvider, AuthModalProvider];

export const AppContextProvider = combineProviders(providers);
