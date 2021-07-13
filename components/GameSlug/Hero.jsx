import styled from 'styled-components';
import Stars from '@components/Homepage/Stars';
import link from '@components/link';
import PlatformsIcons from '@components/PlatformsIcons';
import { useState } from 'react';
import Image from 'next/image';

function Hero({ gameDetails, coverImage }) {
  const [fullDesc, setFullDesc] = useState(false);

  const platformIconsSlugs = platforms =>
    platforms?.map(platform => platform?.platform?.slug);

  return (
    <S.Hero id="hero">
      <Image
        src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_800/${
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
            <PlatformsIcons
              platformsArray={platformIconsSlugs(gameDetails?.platforms)}
            />
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
            <h4
              className="official-website"
              onClick={() => link(gameDetails?.website)}
            >
              Official Website
            </h4>
          )}
        </S.Details>
      </S.HeroContent>
    </S.Hero>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 80vh;
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 500px) {
    margin-bottom: 5rem;
  }

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
  padding: 0 5%;
  height: 100%;
  width: 100%;
  z-index: 2;
  min-height: 35rem;
  margin-top: 10rem;
  align-items: flex-start;

  @media (min-width: 500px) {
    padding: 0 10%;
  }
`;

S.CoverImage = styled.div`
  position: relative;
  width: 400px;
  height: 550px;
  flex: none;
  opacity: 0.8;
  display: none;

  @media (min-width: 850px) {
    display: block;
  }
`;

S.Details = styled.div`
  color: #fff;
  height: 100%;
  margin-left: 0;

  @media (min-width: 850px) {
    margin-left: 3rem;
  }

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
    border-radius: 100rem;
    width: fit-content;
    color: #fff;
    cursor: pointer;
    transition: all ease 0.3s;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.seaBlue};
      color: ${({ theme }) => theme.colors.seaBlue};
    }
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

S.PlatformsContainer = styled.div`
  display: inline;
  .anticon {
    margin: 0 0.2rem;
    cursor: pointer;
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

export default Hero;
