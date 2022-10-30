import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { AppToaster } from '@/components/Toster';
import { store } from '../store';
import '../styles/globals.css';
import GlobalStyles from '../styles/GlobalStyles';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Provider store={store}>
          <GlobalStyles />
          <Component {...pageProps} />
          <AppToaster />
        </Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}
