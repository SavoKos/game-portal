import '../styles/globals.css';
import SCTheme from '../SCTheme';
import Router from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';
import { FiltersProvider } from 'context/Filters';

function Application({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);

  return (
    <SCTheme>
      <FiltersProvider>
        <Component {...pageProps} />
      </FiltersProvider>
    </SCTheme>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.PageContainer = styled.div`
  background-color: #070426;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export default Application;
