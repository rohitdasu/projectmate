import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css'; // Import the styles for nprogress
import { useTheme } from 'next-themes';

// NProgress configuration
NProgress.configure({ showSpinner: false });

export const ProgressBar = () => {
  const { theme } = useTheme();
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleComplete = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <style jsx global>{`
      #nprogress .bar {
        background: ${theme === 'dark' ? '#fff !important' : '#000 !important'};
      }
    `}</style>
  );
};
