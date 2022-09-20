import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import GlobalStyles from './../styles/GlobalStyles';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Provider store={store}>
          <CacheProvider value={cache}>
            <GlobalStyles />
            <Component {...pageProps} />
          </CacheProvider>
        </Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
