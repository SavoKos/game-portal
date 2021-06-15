import '../styles/globals.css';
import Head from 'next/head';

function Application({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Game Portal</title>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
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
    </>
  );
}

export default Application;
