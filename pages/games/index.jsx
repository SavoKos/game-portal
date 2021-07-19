import AdvancedOptions from '@components/Games/AdvancedOptions';
import Filter from '@components/Games/Filter';
import GameSingleItem from '@components/GameSingleItem';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Spinner from '@components/UI/Spinner';
import useFilters from 'context/Filters';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import {
  orderOptions,
  platformOptions as platformOpt,
} from 'functions/dropdownOptions';
import { useEffect, useState } from 'react';

function Games() {
  const { games, Order, Platforms, ParentPlatforms } = useFilters();
  const [platformOptions, setPlatformOptions] = useState(null);

  useEffect(async () => {
    const options = await platformOpt();
    console.log(options);
    setPlatformOptions(options);
  }, []);

  console.log(orderOptions);
  if (!games)
    return (
      <S.PageContainer>
        <Navigation active="games" />
        <Spinner />
      </S.PageContainer>
    );

  return (
    <Layout
      title="All Games - Game Portal"
      url="https://gameportal.savokos.com/games"
      decription="Search, filter and find your favorite game among others"
      image="https://res.cloudinary.com/dicynt7ms/image/upload/v1623090690/game-portal/logo_pj7xg0.png"
    >
      <S.PageContainer>
        <Navigation active="games" />
        <S.GamesContainer>
          <S.BackgroundImage />
          <h1>All Games</h1>
          <S.GamesContent>
            <AdvancedOptions />
            <S.MainContent>
              <S.TopBarContainer>
                <input type="search" placeholder="Search..." />
                <S.Filters>
                  <Filter
                    title="Order by"
                    options={orderOptions}
                    currentFilter={Order}
                  />
                  <Filter
                    title="Platforms"
                    options={platformOptions}
                    currentFilter={ParentPlatforms || Platforms}
                  />
                </S.Filters>
                <h5>Advanced options</h5>
              </S.TopBarContainer>
              <S.Games>
                {games?.map(game => (
                  <GameSingleItem game={game} key={uuid()} />
                ))}
              </S.Games>
            </S.MainContent>
          </S.GamesContent>
        </S.GamesContainer>
      </S.PageContainer>
    </Layout>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  min-height: 100vh;
`;

S.BackgroundImage = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('https://res.cloudinary.com/dicynt7ms/image/upload/v1626363456/game-portal/all-games-hero_clryn2.png');
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

S.GamesContainer = styled.div`
  padding: 0 10%;
  padding-top: 10rem;

  h1 {
    position: relative;
    color: #fff;
    z-index: 5;
  }
`;

S.GamesContent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 5rem;
`;

S.MainContent = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    padding-left: 2rem;
  }
`;

S.TopBarContainer = styled.div`
  border-radius: 5px;
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem;
  flex-direction: column;

  h5 {
    color: ${({ theme }) => theme.colors.seaBlue};
    cursor: pointer;
    padding: 0.5rem;
    padding-top: 1rem;
    display: block;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  p::selection,
  span::selection,
  li::selection,
  ul::selection {
    background: transparent;
  }

  input[type='search'] {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    border: 0;
    border-radius: 0.3rem;
    outline: 0;
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;

    @media (min-width: 900px) {
      margin-bottom: 1rem;
      padding: 1rem 2rem;
    }
  }
`;

S.Filters = styled.div`
  display: flex;
  width: 100%;
`;

S.Games = styled.div`
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

export default Games;
