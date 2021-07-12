import Spinner from '@components/UI/Spinner';
import Router from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '@components/Navigation';
import Layout from '@components/Layout';
import Hero from '@components/GameSlug/Hero';
import MainDetails from '@components/GameSlug/MainDetails';

function Game({ game, errorCode }) {
  const { gameDetails, screenshots, franchise, stores } = game;

  const isError = errorCode >= 200 && errorCode <= 226 ? false : true;
  useEffect(() => {
    if (isError) Router.push('/error');
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
        <Hero coverImage={coverImage} gameDetails={gameDetails} />
        <MainDetails
          stores={stores}
          gameDetails={gameDetails}
          screenshots={screenshots}
        />
      </S.PageContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { slug } }) => {
  try {
    const API_KEY = process.env.API_KEY;
    console.log(API_KEY);
    const [gameDetails, franchise, screenshots, stores] = await Promise.all([
      fetch(
        encodeURI(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`)
      ).then(res => res.json()),
      fetch(
        encodeURI(
          `https://api.rawg.io/api/games/${slug}/game-series?key=${API_KEY}`
        )
      ).then(res => res.json()),
      fetch(
        encodeURI(
          `https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`
        )
      ).then(res => res.json()),
      fetch(
        encodeURI(`https://api.rawg.io/api/games/${slug}/stores?key=${API_KEY}`)
      ).then(res => res.json()),
    ]);

    if (!gameDetails.name) return { props: { errorCode: 404 } };

    return {
      props: {
        game: {
          gameDetails,
          franchise: franchise.results,
          screenshots: screenshots.results,
          stores: stores.results,
        },
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
