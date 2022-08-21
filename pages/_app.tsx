import type { AppProps } from 'next/app';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import GlobalStyles from './../styles/GlobalStyles';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <GlobalStyles />
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
