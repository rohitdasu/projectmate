import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { store } from '../store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Provider store={store}>
          <CacheProvider value={cache}>
            <Component {...pageProps} />
            <ToastContainer />
          </CacheProvider>
        </Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}
