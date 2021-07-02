import Spinner from '@components/UI/Spinner';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '@components/Navigation';
import Image from 'next/image';
import Stars from '@components/Homepage/Stars';
import Link from 'next/link';

function Game({ game, errorCode }) {
  const [fullDesc, setFullDesc] = useState(false);

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
          src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_1280/${
            game?.gameDetails?.background_image ||
            game?.gameDetails?.background_image_additional
          }`}
          priority
          alt={`${game?.gameDetails?.name_original} image`}
          className="hero-img"
          objectFit="cover"
          layout="fill"
          objectPosition="top"
        />
        <S.HeroContent>
          <S.CoverImage className="explorer-gradient">
            <Image
              src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_400,h_600/${game?.gameDetails?.background_image}`}
              alt={`${game?.gameDetails?.name_original} image`}
              objectFit="cover"
              layout="fill"
            />
          </S.CoverImage>
          <S.Details fullDesc={fullDesc}>
            <h1>{game?.gameDetails?.name_original}</h1>
            {game?.gameDetails?.playtime ? (
              <p>AVERAGE PLAYTIME: {game?.gameDetails?.playtime} HOURS</p>
            ) : (
              ''
            )}
            <S.Stars>
              <Stars
                rating={+Math.trunc(game?.gameDetails?.rating)}
                className="stars"
              />
            </S.Stars>
            <p className="description">{game?.gameDetails?.description_raw}</p>
            <span
              className="truncate-text"
              onClick={() => setFullDesc(prevValue => !prevValue)}
            >
              {fullDesc ? 'Show less' : 'Show more'}
            </span>
            <S.Tags>
              {game?.gameDetails?.tags?.map(tag => (
                <p className="tag" key={tag.id}>
                  {tag.name}
                </p>
              ))}
            </S.Tags>
            {game?.gameDetails?.website && (
              <Link href={game?.gameDetails?.website}>
                <h4 className="official-website">Official Website</h4>
              </Link>
            )}
          </S.Details>
        </S.HeroContent>
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
    pointer-events: none;
  }
`;

S.HeroContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20rem;
  height: 100%;
  width: 100%;
  z-index: 2;
  height: 35rem;
  margin-top: 10rem;
`;

S.CoverImage = styled.div`
  position: relative;
  width: 100%;
  width: 400px;
  height: 100%;
  flex: none;
  opacity: 0.8;
`;

S.Details = styled.div`
  color: #fff;
  height: 100%;
  margin-left: 3rem;

  .official-website {
    margin-top: 2rem;
    padding: 0.5rem 1.5rem;
    border: 1px solid #fff;
    border-radius: 100px;
    width: fit-content;
    color: #fff;
    cursor: pointer;
  }

  .truncate-text {
    color: ${({ theme }) => theme.colors.seaBlue};
    cursor: pointer;
    font-weight: 700;
  }

  p {
    overflow: hidden;
    max-height: ${({ fullDesc }) => (fullDesc ? 'none' : '8rem')};
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden !important;
    text-overflow: ellipsis;
    -webkit-line-clamp: ${({ fullDesc }) => (fullDesc ? 'none' : '4')};
  }

  h1 {
    text-transform: uppercase;
  }
`;

S.Stars = styled.div`
  margin: 1rem 0;
`;

S.Tags = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-weight: 300;
  margin: 1rem 0;

  .tag {
    flex: 1 1 auto;
    font-family: ${({ theme }) => theme.fontFamily.poppins};
    margin: 0.15rem;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    padding: 0.5rem;
    cursor: pointer;
    font-weight: 400;
    transition: all ease 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.seaBlue};
    }
  }
`;

export default Game;
