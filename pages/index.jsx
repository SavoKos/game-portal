import FeaturedGames from '@components/Homepage/FeaturedGames';
import GameExplorer from '@components/Homepage/GameExplorer';
import Hero from '@components/Homepage/Hero';
import Navigation from '@components/Navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameTrailer from '@components/Homepage/GameTrailer';
import Spinner from '@components/UI/Spinner';

export const getServerSideProps = async () => {
  try {
    const [customGamesData, games] = await Promise.all([
      fetch('http://localhost:3000/customGamesData.json').then(res =>
        res.json()
      ),
      fetch(
        'https://api.rawg.io/api/games?key=ffc0c5b2524a475993fa130a0f55334c&dates=2020-09-30,2999-01-01&platforms=18,1,7&page_size=28'
      ).then(res => res.json()),
    ]);

    return {
      props: {
        fetchedCustomGamesData: customGamesData,
        games: games.results,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

// const fetchData = async () => {
//   try {
//     const [customGamesData, games] = await Promise.all([
//       fetch('/customGamesData.json').then(res => res.json()),
//       fetch(
//         'https://api.rawg.io/api/games?key=ffc0c5b2524a475993fa130a0f55334c&dates=2020-09-30,2999-01-01&platforms=18,1,7&page_size=28'
//       ).then(res => res.json()),
//     ]);

//     return {
//       fetchedCustomGamesData: customGamesData,
//       games: games.results,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

export default function Home({ fetchedCustomGamesData, games }) {
  // const [customGamesData, setCustomGamesData] = useState({});
  // const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // const { fetchedCustomGamesData, games } = await fetchData();
    setLoading(false);
    // setCustomGamesData(fetchedCustomGamesData);
    // setGamesData(games);
  }, []);

  if (loading)
    return (
      <S.LoadingScreen>
        <Spinner />
      </S.LoadingScreen>
    );

  return (
    <S.PageContainer>
      <Navigation active="home" />
      <Hero />
      <FeaturedGames games={games} />
      <GameExplorer games={games} customGamesData={fetchedCustomGamesData} />
      <GameTrailer customGamesData={fetchedCustomGamesData} />
    </S.PageContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`;

S.LoadingScreen = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
