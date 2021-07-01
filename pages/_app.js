import '../styles/globals.css';
import Head from 'next/head';
import SCTheme from '../SCTheme';
import Router from 'next/router';
import Spinner from '@components/UI/Spinner';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';

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
      <Head>
        <title>Game Portal</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Game Portal. Place " />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href="https://gameportal.savokos.com/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content='Game Portal"' />
        <meta property="og:url" content="https://gameportal.savokos.com/" />
        <meta property="og:site_name" content="Game Portal" />
        <meta property="article:publisher" content="https://savokos.com" />
      </Head>
      <Component {...pageProps} />
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
