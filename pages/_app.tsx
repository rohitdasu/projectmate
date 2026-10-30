import { useState } from 'react';
import { AppProps } from 'next/app';
import useSWR from 'swr';
import { SessionProvider } from 'next-auth/react';
import { AppContextProvider } from '@/context/AppContextProvider';
import { AppDataContext } from '@/context/Common/CommonContext';
import { fetcher } from '@/lib/fetcher';
import { Toaster } from '@/components/ui/toaster';
import { AuthModal } from '@/components/Modals/AuthModal';
import { ProgressBar } from '@/components/Common/ProgressBar';
import { ShareModal } from '@/components/Modals/ShareModal';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const getUserDetailsApiUrl = `/api/user/details`;
  const [randomKey, setRandomKey] = useState();

  const { data: profileDetails, isLoading: isDetailsLoading } = useSWR(
    getUserDetailsApiUrl,
    fetcher,
    { errorRetryCount: 0 }
  );

  const commonContextData = {
    profileDetails: profileDetails,
    isProfileLoading: isDetailsLoading,
    randomKey,
    setRandomKey,
  };

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class" enableSystem>
        <AppContextProvider>
          <AppDataContext.Provider value={commonContextData}>
            <Toaster />
            <AuthModal />
            <ShareModal />
            <ProgressBar />
            <Component {...pageProps} />
          </AppDataContext.Provider>
        </AppContextProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
