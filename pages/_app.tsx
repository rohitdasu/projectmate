import { AppProps } from 'next/app';
import { Toaster } from '@/components/Toaster';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import { AppContextProvider } from '@/context/AppContextProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContextProvider>
        <Component {...pageProps} />
        <Toaster />
      </AppContextProvider>
    </SessionProvider>
  );
}
