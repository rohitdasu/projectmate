import { AppProps } from 'next/app';
import { ErrorFallback } from '@/components/ErrorFallback';
import { Toaster } from '@/components/Toaster';
import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary } from 'react-error-boundary';
import '@/styles/globals.css';
import { AppContextProvider } from '@/context/AppContextProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => typeof window !== undefined && window.location.reload()}
    >
      <SessionProvider session={pageProps.session}>
        <AppContextProvider>
          <Component {...pageProps} />
          <Toaster />
        </AppContextProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
