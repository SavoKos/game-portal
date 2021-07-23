import Image from 'next/image';
import styled from 'styled-components';
import Stars from './Stars';
import Link from 'next/link';
import GameSingleItem from '@components/GameSingleItem';
import Router from 'next/router';
import useFilters from 'context/Filters';

function GameExplorerItems({ games, customGameData }) {
  const { setTags, setPage, setGames } = useFilters();

  const tagClickedHandler = tag => {
    Router.push('/games');
    setPage(1);
    setGames(null);
    setTags(tag);
  };

  return (
    <S.GameExplorerItems>
      <S.FeaturedGame
        className="shadow-white"
        style={{
          backgroundImage: `url(${`https://res.cloudinary.com/dicynt7ms/image/upload/b_rgb:05021b,o_29,f_webp,w_1000,h_500,c_fill/v1623090955/game-portal/${customGameData?.background}`})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <S.RatingContainer>
          <h2>RATING</h2>
          <S.RatingCircle>
            <h3>{customGameData?.rating}</h3>
          </S.RatingCircle>
          <div>
            <Stars rating={+Math.trunc(customGameData?.rating)} />
          </div>
        </S.RatingContainer>
        <S.GameInfo>
          <h4>{customGameData?.released?.slice(0, 4)}</h4>
          <h2>{customGameData?.name_original}</h2>
          <p className="description">{customGameData?.description_raw}</p>
          <S.TagsContainer>
            {customGameData?.tags?.slice(0, 5).map(tag => (
              <S.Tag key={tag.id} onClick={() => tagClickedHandler(tag.slug)}>
                {tag.name}
              </S.Tag>
            ))}
          </S.TagsContainer>
          <Link href={'/games/' + customGameData?.slug || ''}>
            <S.MoreInfoBtn className="shadow-white">More Info</S.MoreInfoBtn>
          </Link>
        </S.GameInfo>
        <S.CoverImage className="explorer-gradient shadow-white">
          <Image
            layout="fill"
            objectFit="cover"
            src={`https://res.cloudinary.com/dicynt7ms/image/upload/c_fill,w_400,h_600,q_100/v1623091234/game-portal/${customGameData?.cover}`}
          />
        </S.CoverImage>
      </S.FeaturedGame>
      {/* List of other games */}
      {games?.map(game => (
        <GameSingleItem game={game} key={game.id} />
      ))}
    </S.GameExplorerItems>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.GameExplorerItems = styled.div`
  flex-wrap: wrap;
  padding-bottom: 11rem;
  justify-content: center;
  margin-top: 10rem;
  display: flex;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

S.FeaturedGame = styled.div`
  width: 100%;
  height: 440px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  position: relative;
  border-bottom-right-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  @media (min-width: 1280px) {
    width: 60%;
  }
`;

S.RatingContainer = styled.div`
  position: absolute;
  top: -6rem;
  left: 0;
  display: flex;
  align-items: center;
  margin-left: 1rem;

  @media (min-width: 1024px) {
    margin-left: 0;
    left: 50%;
  }

  h2 {
    color: #374151;
    font-size: 1.5rem;
    line-height: 2rem;

    @media (min-width: 768px) {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }
`;

S.RatingCircle = styled.div`
  background-color: ${({ theme }) => theme.colors.seaBlue};
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 1.25rem;

  h3 {
    color: #fff;
    font-weight: 700;
  }
`;

S.GameInfo = styled.div`
  color: #fff;
  position: absolute;
  right: 0;
  width: 100%;
  top: 0.75rem;
  display: grid;
  place-items: center;

  @media (min-width: 1024px) {
    width: 50%;
    display: block;
  }

  h4 {
    font-weight: 600;
    color: rgba(156, 163, 175);
  }

  h2 {
    font-weight: 700;
    font-size: 1.875rem;
    line-height: 2.25rem;
    text-transform: uppercase;
    margin: 1.25rem 0;
  }

  .description {
    width: 90%;
    font-size: 16px;
    @media (min-width: 768px) {
      width: 24rem;
    }
  }
`;

S.TagsContainer = styled.div`
  display: flex;
  max-width: 400px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-weight: 300;
`;

S.Tag = styled.p`
  flex: 1 1 auto;
  width: 33.333333%;
  margin: 0.25rem;
  border-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 0.5rem;
  font-weight: 400;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.seaBlue};
  }
`;

S.MoreInfoBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.seaBlue};
  outline: 0;
  padding: 0.5rem 1.75rem;
  font-weight: 600;
  border-radius: 1.5rem;
  margin-top: 1.25rem;
  border: 0;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
`;

S.CoverImage = styled.div`
  max-width: 400px;
  height: 510px;
  display: none;
  position: relative;
  top: -25%;
  left: -0.75rem;
  background-color: ${({ theme }) => theme.colors.primaryLight};

  @media (min-width: 1024px) {
    display: block;
  }
`;

export default GameExplorerItems;
