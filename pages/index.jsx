import FeaturedGames from '@components/Homepage/FeaturedGames';
import GameExplorer from '@components/Homepage/GameExplorer';
import Hero from '@components/Homepage/Hero';
import Navigation from '@components/Navigation';
import styled from 'styled-components';
import GameTrailer from '@components/Homepage/GameTrailer';
import { useEffect, useState } from 'react';

export default function Home() {
  const [customGamesData, setCustomGamesData] = useState({});
  const [gamesData, setGamesData] = useState([]);

  useEffect(async () => {
    const { fetchedCustomGamesData, games, error } = await fetchData();
    console.log(error);
    setCustomGamesData(fetchedCustomGamesData);
    setGamesData(games);
  }, []);

  return (
    <S.PageContainer>
      <Navigation active="home" />
      <Hero />
      <FeaturedGames games={gamesData} />
      <GameExplorer games={gamesData} customGamesData={customGamesData} />
      <GameTrailer customGamesData={customGamesData} />
    </S.PageContainer>
  );
}

const fetchData = async () => {
  try {
    const [customGamesData, games] = await Promise.all([
      fetch('/customGamesData.json').then(res => res.json()),
      fetch(
        'https://api.rawg.io/api/games?key=ffc0c5b2524a475993fa130a0f55334c&dates=2020-09-30,2999-01-01&platforms=18,1,7&page_size=28'
      ).then(res => res.json()),
    ]);

    return {
      fetchedCustomGamesData: customGamesData,
      games: games.results,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`;
