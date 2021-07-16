import Filter from '@components/Games/Filter';
import GameSingleItem from '@components/GameSingleItem';
import Navigation from '@components/Navigation';
import Spinner from '@components/UI/Spinner';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Games() {
  const [order, setOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchedPlatforms, setFetchedPlatforms] = useState('');
  const [platforms, setPlatforms] = useState('');
  const [games, setGames] = useState('');
  console.log(games);

  useEffect(async () => {
    const apiKey = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';
    const [platforms, games] = await Promise.all([
      fetch(
        `https://api.rawg.io/api/platforms/lists/parents?key=${apiKey}`
      ).then(res => res.json()),
      fetch(`https://api.rawg.io/api/games?page_size=40&key=${apiKey}`).then(
        res => res.json()
      ),
    ]);
    setFetchedPlatforms(platforms.results);
    setGames(games.results);
    setLoading(false);
  }, []);

  const orderOptions = [
    { name: 'Relevance', value: '-relevance' },
    { name: 'Date added', value: '-created' },
    { name: 'Name', value: 'name' },
    { name: 'Release date', value: '-released' },
    { name: 'Popularity', value: '-added' },
    { name: 'Average rating', value: '-rating' },
  ];

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
    <S.PageContainer>
      <Navigation active="games" />
      <S.GamesContainer>
        <S.BackgroundImage />
        <h1>All Games</h1>
        <S.GamesContent>
          <S.Aside></S.Aside>
          <S.MainContent>
            <S.FiltersContainer>
              <Filter
                setFilter={setOrder}
                title="Order by"
                options={orderOptions}
              />
              <Filter
                setFilter={setPlatforms}
                title="Platforms"
                options={platformOptions}
                dropdownStyle={{ width: '15rem' }}
              />
            </S.FiltersContainer>
            <S.Games>
              {games.map(game => (
                <GameSingleItem game={game} key={game.id} />
              ))}
            </S.Games>
          </S.MainContent>
        </S.GamesContent>
      </S.GamesContainer>
    </S.PageContainer>
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
`;

S.MainContent = styled.div`
  padding-left: 2rem;
  width: 100%;
`;

S.FiltersContainer = styled.div`
  border-radius: 5px;
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 0;

  .dropdown:nth-of-type(2) {
    width: 15rem;
  }
`;

S.Games = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  padding-top: 10rem;
  padding-bottom: 15rem;

  padding: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  padding-bottom: 11rem;
  justify-content: center;
  margin-top: 10rem;
  display: flex;
  position: relative;

  @media (min-width: 500px) {
    padding: 0 5%;
  }

  .game-item {
    max-height: 300px;
    box-shadow: none;

    @media (min-width: 500px) {
      width: 50%;
    }

    @media (min-width: 800px) {
      padding: 0 10%;
      width: 23%;
    }

    @media (min-width: 1280px) {
      width: 20%;
    }
  }

  @media (min-width: 850px) {
    padding-bottom: 20rem;
  }
`;

export default Games;
