import { ErrorFallback } from '@/components/ErrorFallback';
import { AppToaster } from '@/components/Toaster';
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
          <Component {...pageProps} />
          <AppToaster />
        </Provider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
