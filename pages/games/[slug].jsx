import Spinner from '@components/UI/Spinner';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '@components/Navigation';
import Layout from '@components/Layout';
import Hero from '@components/GameSlug/Hero';
import MainDetails from '@components/GameSlug/MainDetails';

function Game({ gameDetails, errorCode, slug }) {
  const [franchise, setFranchise] = useState('');
  const [screenshots, setScreenshots] = useState('');
  const [stores, setStores] = useState('');

  const isError = errorCode >= 200 && errorCode <= 226 ? false : true;
  console.log(screenshots, isError);
  useEffect(async () => {
    if (isError) Router.push('/error');

    try {
      const API_KEY = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';
      const [franchise, screenshots, stores] = await Promise.all([
        fetch(
          encodeURI(
            `https://api.rawg.io/api/games/${slug}/game-series?key=${API_KEY}`
          )
        ).then(res => res.json()),
        fetch(
          encodeURI(
            `https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}&page_size=40`
          )
        ).then(res => res.json()),
        fetch(
          encodeURI(
            `https://api.rawg.io/api/games/${slug}/stores?key=${API_KEY}`
          )
        ).then(res => res.json()),
      ]);

      setFranchise(franchise.results);
      setStores(stores.results);
      setScreenshots(screenshots.results);
    } catch (error) {
      console.log(error);
      Router.push('/error');
    }
  }, []);

  if (isError)
    return (
      <S.Error>
        <Spinner />
      </S.Error>
    );

  const coverImage = `https://res.cloudinary.com/demo/image/fetch/c_fill,w_400,h_600/${gameDetails?.background_image}`;
  const currentUrl = `https://gameportal.savokos.com/games/${gameDetails?.slug}`;
  const title = gameDetails?.name_original + ' - Game Portal';
  return (
    <Layout
      title={title}
      url={currentUrl}
      description={gameDetails?.description_raw.slice(0, 130) + '...'}
      image={coverImage}
    >
      <S.PageContainer>
        <Navigation />
        {gameDetails && (
          <Hero coverImage={coverImage} gameDetails={gameDetails} />
        )}

        {stores && gameDetails && screenshots && (
          <MainDetails
            stores={stores}
            gameDetails={gameDetails}
            screenshots={screenshots}
          />
        )}
      </S.PageContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { slug } }) => {
  try {
    const API_KEY = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';
    const gameDetails = await fetch(
      encodeURI(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`)
    ).then(res => res.json());

    if (!gameDetails.name) return { props: { errorCode: 404 } };

    return {
      props: {
        gameDetails,
        slug,
        errorCode: 200,
      },
    };
  } catch (error) {
    return { props: error };
  }
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Error = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  min-height: 120vh;

  .bg-img {
    opacity: 0.2;
    object-fit: cover;
    width: 100%;
    object-position: top;
    height: 100%;
    pointer-events: none;
  }
`;

export default Game;
