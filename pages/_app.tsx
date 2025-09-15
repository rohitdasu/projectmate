import { AppProps } from 'next/app';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import { AppContextProvider } from '@/context/AppContextProvider';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import { AuthModal } from '@/components/Modals/AuthModal';
import { ShareModal } from '@/components/Modals/ShareModal';
import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';
import { AppDataContext } from '@/context/Common/CommonContext';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ProgressBar } from '@/components/Common/ProgressBar';

export default function MyApp({ Component, pageProps }: AppProps) {
  const userDetailsUrl = `/api/user/details`;
  const [randomKey, setRandomKey] = useState();
  const { data: profileDetails, isLoading: isDetailsLoading } = useSWR(
    userDetailsUrl,
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
            {!isDetailsLoading ? (
              <>
                <ProgressBar />
                <Component {...pageProps} />
              </>
            ) : (
              <div className="flex h-dvh w-screen items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin" />
              </div>
            )}
          </AppDataContext.Provider>
        </AppContextProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
