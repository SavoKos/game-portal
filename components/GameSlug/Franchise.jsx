import styled from 'styled-components';
import Image from 'next/image';
import GameSingleItem from '@components/GameSingleItem';

function Franchise({ franchiseGames, screenshots, slugDetails }) {
  return (
    <S.FranchiseContainer>
      {screenshots && (
        <Image
          src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_1200/${
            screenshots[2]?.image || slugDetails?.background_image
          }`}
          alt={`${slugDetails?.name_original} screenshot`}
          className="bg-img"
          objectFit="cover"
          layout="fill"
          objectPosition="top"
        />
      )}
      <S.Franchise>
        <h1>Franchise</h1>
        {franchiseGames.map(game => (
          <GameSingleItem game={game} key={game.id} />
        ))}
      </S.Franchise>
    </S.FranchiseContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.FranchiseContainer = styled.div`
  display: flex;
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-top: 10rem;
  padding-bottom: 15rem;

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to top, rgba(255, 0, 0, 0) 0%, #070426 100%);
  }

  @media (min-width: 850px) {
    padding-bottom: 20rem;
  }
`;

S.Franchise = styled.div`
  padding: 0 5%;
  z-index: 2;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  padding-bottom: 11rem;
  justify-content: center;
  margin-top: 10rem;
  display: flex;
  position: relative;

  h1 {
    position: absolute;
    z-index: 5;
    top: -5rem;
    color: #fff;
  }

  @media (min-width: 500px) {
    padding: 0 10%;
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export default Franchise;
