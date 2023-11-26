import { AppProps } from 'next/app';
import { Toaster } from '@/components/Toaster';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import { AppContextProvider } from '@/context/AppContextProvider';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import { AuthModal } from '@/components/AuthModal';
import { ShareModal } from '@/components/ShareModal';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={pageProps.session}>
        <AppContextProvider>
          <Component {...pageProps} />
          <Toaster />
          <AuthModal title="" />
          <ShareModal />
        </AppContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
