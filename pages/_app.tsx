import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { store } from '../store';
import GlobalStyles from './../styles/GlobalStyles';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
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
