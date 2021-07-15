import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '@components/Navigation';
import Layout from '@components/Layout';
import Hero from '@components/GameSlug/Hero';
import MainDetails from '@components/GameSlug/MainDetails';
import GamesListRow from '@components/GamesListRow';
import Franchise from '@components/GameSlug/Franchise';

function Game({ slug }) {
  const [franchise, setFranchise] = useState('');
  const [slugDetails, setslugDetails] = useState('');
  const [screenshots, setScreenshots] = useState('');
  const [stores, setStores] = useState('');
  const [suggestions, setSuggestions] = useState('');

  useEffect(async () => {
    try {
      const API_KEY = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';
      const [slugDetails, franchise, screenshots, stores, suggested] =
        await Promise.all([
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
              `https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}&page_size=40`
            )
          ).then(res => res.json()),
          fetch(
            encodeURI(
              `https://api.rawg.io/api/games/${slug}/stores?key=${API_KEY}`
            )
          ).then(res => res.json()),
          fetch(
            encodeURI(
              `https://api.rawg.io/api/games/${slug}/suggested?key=${API_KEY}`
            )
          ).then(res => res.json()),
        ]);

      setslugDetails(slugDetails);
      setFranchise(franchise.results);
      setStores(stores.results);
      setScreenshots(screenshots.results);
      setSuggestions(suggested.results);
    } catch (error) {
      Router.push('/error');
    }
  }, [slug]);

  const coverImage = slugDetails
    ? `https://res.cloudinary.com/demo/image/fetch/c_fill,w_400,h_600/${slugDetails?.background_image}`
    : '';
  const currentUrl = slugDetails
    ? `https://gameportal.savokos.com/games/${slugDetails?.slug}`
    : 'https://gameportal.savokos.com';
  const title = slugDetails
    ? slugDetails?.name_original + ' - Game Portal'
    : 'Game Portal Game';

  console.log(franchise);

  return (
    <Layout
      title={title}
      url={currentUrl}
      description={slugDetails?.description_raw?.slice(0, 130) + '...'}
      image={coverImage}
    >
      <S.PageContainer>
        <Navigation />
        {slugDetails && (
          <Hero coverImage={coverImage} slugDetails={slugDetails} />
        )}

        {stores && slugDetails && screenshots && (
          <MainDetails
            stores={stores}
            slugDetails={slugDetails}
            screenshots={screenshots}
          />
        )}
        <S.SuggestedGames>
          <h1>Similar Games</h1>
          {suggestions && (
            <GamesListRow games={suggestions} className="games-list" />
          )}
        </S.SuggestedGames>
        {franchise && franchise.length > 0 && (
          <Franchise
            franchiseGames={franchise}
            screenshots={screenshots}
            slugDetails={slugDetails}
          />
        )}
      </S.PageContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { slug } }) => {
  return {
    props: {
      slug,
    },
  };
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

S.SuggestedGames = styled.div`
  position: relative;

  .games-list {
    margin: 0;
    height: fit-content;
  }

  h1 {
    position: absolute;
    z-index: 5;
    left: 1rem;
    top: -5rem;
    color: #fff;
  }
`;

export default Game;
