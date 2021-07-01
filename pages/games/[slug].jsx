import Spinner from '@components/UI/Spinner';
import Router from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '@components/Navigation';
import Image from 'next/image';

function Game({ game, errorCode }) {
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

  return (
    <S.PageContainer>
      <Navigation />
      <S.Hero id="hero">
        <Image
          src={`https://res.cloudinary.com/demo/image/fetch/c_limit,w_1280/${
            game.gameDetails.background_image ||
            game.gameDetails.background_image_additional
          }`}
          priority
          alt={`${game?.gameDetails?.name_original} image`}
          className="hero-img"
          objectFit="cover"
          layout="fill"
          objectPosition="top"
        />
        <S.HeroContent></S.HeroContent>
      </S.Hero>
    </S.PageContainer>
  );
}

export const getServerSideProps = async ({ query: { slug } }) => {
  try {
    const API_KEY = process.env.API_KEY;
    console.log(API_KEY);
    const [gameDetails, franchise, trailers] = await Promise.all([
      fetch(
        encodeURI(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`)
      ).then(res => res.json()),
      fetch(
        encodeURI(
          `https://api.rawg.io/api/games/${slug}/game-series?key=${API_KEY}`
        )
      ).then(res => res.json()),
      fetch(
        encodeURI(`https://api.rawg.io/api/games/${slug}/movies?key=${API_KEY}`)
      ).then(res => res.json()),
    ]);

    if (!gameDetails.name) return { props: { errorCode: 404 } };

    return {
      props: {
        game: { gameDetails, franchise, trailers },
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
`;

S.Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 80vh;
  width: 100%;

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, #070426 100%);
    background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, #070426 100%);
  }

  .hero-img {
    opacity: 0.2;
    object-fit: cover;
    width: 100%;
    object-position: top;
    height: 100%;
  }
`;

S.HeroContent = styled.div`
  display: flex;
  align-items: center;
`;
export default Game;
