import { useState } from 'react';
import { AppProps } from 'next/app';
import useSWR from 'swr';
import { SessionProvider, useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { AppContextProvider } from '@/context/AppContextProvider';
import { AppDataContext } from '@/context/Common/CommonContext';
import { fetcher } from '@/lib/fetcher';
import { Toaster } from '@/components/ui/toaster';
import { AuthModal } from '@/components/Modals/AuthModal';
import { ProgressBar } from '@/components/Common/ProgressBar';
import { ShareModal } from '@/components/Modals/ShareModal';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import '@/styles/globals.css';

type AppContentProps = {
  Component: AppProps['Component'];
  pageProps: AppProps['pageProps'];
};

function AppContent({ Component, pageProps }: AppContentProps) {
  const getUserDetailsApiUrl = `/api/user/details`;
  const [randomKey, setRandomKey] = useState();

  const { status: currentUserStatus } = useSession();

  const isAuth = currentUserStatus === 'authenticated';

  const { data: profileDetails, isLoading: isDetailsLoading } = useSWR(
    isAuth ? getUserDetailsApiUrl : null,
    isAuth ? fetcher : () => null,
    { errorRetryCount: 0 }
  );

  const commonContextData = {
    profileDetails: profileDetails,
    isProfileLoading: isDetailsLoading,
    randomKey,
    setRandomKey,
  };

  return (
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
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}
