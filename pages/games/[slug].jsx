import Spinner from '@components/UI/Spinner';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '@components/Navigation';
import Image from 'next/image';
import Stars from '@components/Homepage/Stars';
import Link from 'next/link';
import Layout from '@components/Layout';
import GamePlatforms from '@components/GamePlatforms';

function Game({ game, errorCode }) {
  const { gameDetails, screenshots, franchise } = game;
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
        <S.Hero id="hero">
          <Image
            src={`https://res.cloudinary.com/demo/image/fetch/c_fill/${
              gameDetails?.background_image ||
              gameDetails?.background_image_additional
            }`}
            priority
            alt={`${gameDetails?.name_original} image`}
            className="bg-img"
            objectFit="cover"
            layout="fill"
            objectPosition="top"
          />
          <S.HeroContent>
            <S.CoverImage className="explorer-gradient">
              <Image
                src={coverImage}
                alt={`${gameDetails?.name_original} image`}
                objectFit="cover"
                layout="fill"
              />
            </S.CoverImage>
            <S.Details fullDesc={fullDesc}>
              <h1>{gameDetails?.name_original}</h1>
              {gameDetails?.playtime ? (
                <p>AVERAGE PLAYTIME: {gameDetails?.playtime} HOURS</p>
              ) : (
                ''
              )}
              <p className="platforms-title">AVAILABLE ON: </p>
              <S.PlatformsContainer>
                <GamePlatforms platformsArray={gameDetails?.platforms} />
              </S.PlatformsContainer>

              <S.Stars>
                <Stars
                  rating={+Math.trunc(gameDetails?.rating)}
                  className="stars"
                />
              </S.Stars>
              <div>
                <p className="description">{gameDetails?.description_raw}</p>
              </div>
              <span
                className="truncate-text"
                onClick={() => setFullDesc(prevValue => !prevValue)}
              >
                {fullDesc ? 'Show less' : 'Show more'}
              </span>
              <S.Tags>
                {gameDetails?.tags?.map(tag => (
                  <p className="tag" key={tag.id}>
                    {tag.name}
                  </p>
                ))}
              </S.Tags>
              {gameDetails?.website && (
                <Link href={gameDetails?.website}>
                  <h4 className="official-website">Official Website</h4>
                </Link>
              )}
            </S.Details>
          </S.HeroContent>
        </S.Hero>
        <S.MainDetailsContainer>
          <Image
            src={`https://res.cloudinary.com/demo/image/fetch/c_fill/${
              screenshots[0]?.image || gameDetails?.background_image
            }`}
            priority
            alt={`${gameDetails?.name_original} image`}
            className="bg-img"
            objectFit="cover"
            layout="fill"
            objectPosition="top"
          />
          <S.MainDetails className="blue-overlay">
            <S.Screenshots>
              <h1>Screenshot</h1>
            </S.Screenshots>
          </S.MainDetails>
        </S.MainDetailsContainer>
      </S.PageContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { slug } }) => {
  try {
    const API_KEY = process.env.API_KEY;
    console.log(API_KEY);
    const [gameDetails, franchise, screenshots] = await Promise.all([
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
    ]);

    if (!gameDetails.name) return { props: { errorCode: 404 } };

    return {
      props: {
        game: {
          gameDetails,
          franchise: franchise.results,
          screenshots: screenshots.results,
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

S.Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 80vh;
  width: 100%;
  margin-bottom: 5rem;

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
`;

S.HeroContent = styled.div`
  display: flex;
  padding: 0 20rem;
  height: 100%;
  width: 100%;
  z-index: 2;
  min-height: 35rem;
  margin-top: 10rem;
  align-items: flex-start;
`;

S.CoverImage = styled.div`
  position: relative;
  width: 400px;
  height: 550px;
  flex: none;
  opacity: 0.8;
`;

S.Details = styled.div`
  color: #fff;
  height: 100%;
  margin-left: 3rem;

  p:nth-of-type(1) {
    margin-top: 0.1rem;
  }

  .platforms-title {
    display: inline;
  }

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
S.MainDetailsContainer = styled.div`
  padding: 0 10rem;
  position: relative;
  min-height: 80vh;
  width: 100%;

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to top, rgba(255, 0, 0, 0) 0%, #070426 100%);
  }
`;

S.MainDetails = styled.div`
  width: 100%;
  height: 100%;
`;

S.Screenshots = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.PlatformsContainer = styled.div`
  display: inline;
  .anticon {
    margin: 0 0.2rem;
    cursor: pointer;
  }
`;

export default Game;
