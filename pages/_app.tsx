import { AppProps } from 'next/app';
import { ErrorFallback } from '@/components/ErrorFallback';
import { Toaster } from '@/components/Toaster';
import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@/styles/globals.css';
import { ModalsProvider } from '@/context/modals/ModalsProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => typeof window !== undefined && window.location.reload()}
    >
      <SessionProvider session={pageProps.session}>
        <ModalsProvider>
          <Provider store={store}>
            <Component {...pageProps} />
            <Toaster />
          </Provider>
        </ModalsProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
