import GamesListRow from '@components/GamesListRow';
import GameExplorer from '@components/Homepage/GameExplorer';
import Hero from '@components/Homepage/Hero';
import Navigation from '@components/Navigation';
import styled from 'styled-components';
import GameTrailer from '@components/Homepage/GameTrailer';
import Layout from '@components/Layout';
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function Homepage() {
  const [customGamesData, setCustomGamesData] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(async () => {
    const apiKey = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';

    const [customGamesData, games] = await Promise.all([
      fetch('https://gameportal.savokos.com/customGamesData.json').then((res) =>
        res.json()
      ),
      fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&dates=2020-09-30,2999-01-01&platforms=18,1,7&page_size=28`
      ).then((res) => res.json()),
    ]);

    if (!games?.results) return Router.push('/404');

    setCustomGamesData(customGamesData);
    setGames(games.results);
  }, []);

  return (
    <Layout
      title='Game portal - Discover your next favorite game.'
      url='https://gameportal.savokos.com'
      description='Game Portal - Place where you will discover your next favorite game'
      image='https://res.cloudinary.com/dicynt7ms/image/upload/v1623090690/game-portal/logo_pj7xg0.png'
    >
      <S.PageContainer>
        <Navigation active='home' />
        <Hero />
        <GamesListRow games={games} />
        <GameExplorer games={games} customGamesData={customGamesData} />
        <GameTrailer customGamesData={customGamesData} />
      </S.PageContainer>
    </Layout>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`;
