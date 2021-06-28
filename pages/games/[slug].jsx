import Spinner from '@components/UI/Spinner';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '@components/Navigation';
import Image from 'next/image';
import ProgressiveImage from 'react-progressive-image';
function Game({ game, errorCode }) {
  const [loading, setLoading] = useState(true);
  console.log(game.gameDetails);
  const isError = errorCode >= 200 && errorCode <= 226 ? false : true;
  console.log(errorCode);

  useEffect(() => {
    console.log(errorCode);
    if (isError) Router.push('/error');
    setLoading(false);
  }, []);

  if (loading || isError)
    return (
      <S.Error>
        <Spinner />
      </S.Error>
    );

  return (
    <S.PageContainer>
      <Navigation />
      <S.Hero id="hero">
        <ProgressiveImage
          src={`https://res.cloudinary.com/demo/image/fetch/c_limit,w_1280/${
            game.gameDetails.background_image ||
            game.gameDetails.background_image_additional
          }`}
          placeholder={`https://res.cloudinary.com/demo/image/fetch/q_10:444,w_100/${
            game.gameDetails.background_image ||
            game.gameDetails.background_image_additional
          }`}
        >
          {src => (
            <img
              src={src}
              alt="an image"
              className="hero-img"
              objectFit="cover"
              layout="fill"
              objectPosition="top"
            />
          )}
        </ProgressiveImage>

        <S.HeroContent></S.HeroContent>
      </S.Hero>
    </S.PageContainer>
  );
}

Game.getInitialProps = async ({ query: { slug } }) => {
  const APIKey = 'ffc0c5b2524a475993fa130a0f55334c';
  const [gameDetails, franchise, trailers] = await Promise.all([
    fetch(
      encodeURI(`https://api.rawg.io/api/games/${slug}?key=${APIKey}`)
    ).then(res => res.json()),
    fetch(
      encodeURI(
        `https://api.rawg.io/api/games/${slug}/game-series?key=${APIKey}`
      )
    ).then(res => res.json()),
    fetch(
      encodeURI(`https://api.rawg.io/api/games/${slug}/movies?key=${APIKey}`)
    ).then(res => res.json()),
  ]);

  const isError = typeof gameDetails === 'object' ? false : true;
  if (isError) return { errorCode: 404 };

  return {
    game: { gameDetails, franchise, trailers },
    errorCode: 200,
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
