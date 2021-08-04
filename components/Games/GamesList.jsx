import { v4 as uuid } from 'uuid';
import GameSingleItem from '@components/GameSingleItem';
import styled from 'styled-components';
import useFilters from 'context/Filters';

function GamesList() {
  const { games, setPage } = useFilters();

  if (games.length === 0)
    return (
      <S.GamesList className="games-list">
        <h2 className="missing-game">
          We could not find any game. Try with a different filter
        </h2>
      </S.GamesList>
    );

  return (
    <S.GamesList className="games-list">
      {games.map(game => (
        <GameSingleItem game={game} key={uuid()} />
      ))}
      <a
        className="load-more"
        onClick={() => setPage(prevPage => prevPage + 1)}
      >
        Load more
      </a>
    </S.GamesList>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.GamesList = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  padding-top: 0;
  padding-bottom: 15rem;
  padding: 0;
  z-index: 2;
  width: 100%;
  flex-wrap: wrap;
  padding-bottom: 10rem;
  justify-content: center;
  margin-top: 5rem;
  display: flex;
  position: relative;

  .load-more {
    padding: 1rem;
    border-radius: 0.3rem;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.seaBlue};
    position: absolute;
    bottom: 5rem;
    outline: 0;
    border: 0;
    font-size: 1.05rem;
    cursor: pointer;
  }

  .missing-game {
    color: #fff;
  }

  .game-item {
    box-shadow: none;
    max-height: 400px;
    width: 100%;
    margin: 0.5rem 0;
    max-width: unset;

    @media (min-width: 500px) {
      max-height: 300px;
      max-width: 400px;
    }

    @media (min-width: 600px) {
      margin: 0.5rem;
      max-height: 300px;
      width: 50%;
    }

    @media (min-width: 800px) {
      width: 23%;
      max-height: 350px;
    }

    @media (min-width: 1280px) {
      margin: 0 0.5rem;
      width: 20%;
    }
  }

  @media (min-width: 850px) {
    padding-bottom: 20rem;
  }
`;

export default GamesList;
