import type { AppProps } from 'next/app';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import GlobalStyles from './../styles/GlobalStyles';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <GlobalStyles />
        <Component {...pageProps} />
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
