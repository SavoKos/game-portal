import Filter from '@components/Games/Filter';
import GameSingleItem from '@components/GameSingleItem';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Spinner from '@components/UI/Spinner';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

function Games() {
  const orderOptions = [
    { name: 'Relevance', value: '-relevance' },
    { name: 'Date added', value: '-created' },
    { name: 'Name', value: 'name' },
    { name: 'Release date', value: '-released' },
    { name: 'Popularity', value: '-added' },
    { name: 'Average rating', value: '-rating' },
  ];
  const apiKey = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';
  const [fetchedPlatforms, setFetchedPlatforms] = useState('');
  const [order, setOrder] = useState(orderOptions[0]);
  const [platforms, setPlatforms] = useState('');
  const [subPlatforms, setSubPlatforms] = useState('');
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState('');
  console.log(subPlatforms, platforms);

  useEffect(async () => {
    let platformsQuery = platforms
      ? `&parent_platforms=${platforms.value}`
      : `&platforms=${subPlatforms.value}`;
    if (!platforms && !subPlatforms) platformsQuery = '';

    const games = await fetch(
      `https://rawg.io/api/games/lists/main?discover=true&ordering=${order.value}${platformsQuery}&page=1&page_size=40&key=${apiKey}`
    ).then(res => res.json());

    setGames(games.results);
    setLoading(false);
  }, [order, platforms, subPlatforms]);

  useEffect(async () => {
    const platforms = await fetch(
      `https://api.rawg.io/api/platforms/lists/parents?key=${apiKey}`
    ).then(res => res.json());
    setFetchedPlatforms(platforms.results);
  }, []);

  // remove platforms with no results and make subOptions for playstation and xbox
  let platformOptions = '';
  if (fetchedPlatforms)
    platformOptions = fetchedPlatforms
      ?.filter(
        platform =>
          platform.slug !== 'sega' &&
          platform.slug !== '3do' &&
          platform.slug !== 'commodore-amiga' &&
          platform.slug !== 'neo-geo' &&
          platform.slug !== 'atari'
      )
      .map(platform => {
        if (platform.slug === 'playstation' || platform.slug === 'xbox')
          return {
            name: platform.name,
            value: platform.id,
            subOptions: platform.platforms
              .filter(
                platform =>
                  platform.slug !== 'playstation3' &&
                  platform.slug !== 'playstation2' &&
                  platform.slug !== 'playstation1' &&
                  platform.slug !== 'psp' &&
                  platform.slug !== 'xbox360' &&
                  platform.slug !== 'xbox-old'
              )
              .map(platform => {
                return { name: platform.name, value: platform.id };
              }),
          };

        return {
          name: platform.name,
          value: platform.id,
        };
      });

  if (loading)
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
            <S.Aside></S.Aside>
            <S.MainContent>
              <S.TopBarContainer>
                <input type="search" placeholder="Search..." />
                <S.Filters>
                  <Filter
                    setFilter={setOrder}
                    title="Order by"
                    options={orderOptions}
                    currentFilter={order}
                    setSubPlatforms={setSubPlatforms}
                  />
                  <Filter
                    setFilter={setPlatforms}
                    title="Platforms"
                    options={platformOptions}
                    currentFilter={subPlatforms || platforms}
                    setSubPlatforms={setSubPlatforms}
                  />
                </S.Filters>
                <h5>Advanced options</h5>
              </S.TopBarContainer>
              <S.Games>
                {games.map(game => (
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

S.Aside = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 25%;
  border-radius: 5px;
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
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
