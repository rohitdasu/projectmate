import { ErrorFallback } from '@/components/ErrorFallback';
import { AppToaster } from '@/components/Toaster';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { store } from '../store';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => typeof window !== undefined && window.location.reload()}
    >
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <CacheProvider value={cache}>
            <Component {...pageProps} />
            <AppToaster />
          </CacheProvider>
        </Provider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
