import FeaturedGames from '@components/Homepage/FeaturedGames';
import GameExplorer from '@components/Homepage/GameExplorer';
import Hero from '@components/Homepage/Hero';
import Navigation from '@components/Navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameTrailer from '@components/Homepage/GameTrailer';

const fetchData = async () => {
  try {
    const [customGameData, games] = await Promise.all([
      fetch('/customGameData.json').then(res => res.json()),
      fetch(
        'https://api.rawg.io/api/games?key=ffc0c5b2524a475993fa130a0f55334c&dates=2020-09-30,2999-01-01&platforms=18,1,7'
      ).then(res => res.json()),
    ]);

    return {
      fetchedCustomGameData: customGameData,
      games: games.results,
    };
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  const [customGameData, setCustomGameData] = useState({});
  const [gamesData, setGamesData] = useState([]);
  useEffect(async () => {
    const { fetchedCustomGameData, games } = await fetchData();
    setCustomGameData(fetchedCustomGameData);
    setGamesData(games);
  }, []);

  return (
    <S.PageContainer>
      <Navigation active="home" />
      <Hero />
      <FeaturedGames games={gamesData} />
      <GameExplorer games={gamesData} customGameData={customGameData} />
      <GameTrailer customGameData={customGameData} />
    </S.PageContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`;
