import FeaturedGames from '@components/Homepage/FeaturedGames';
import GameExplorer from '@components/Homepage/GameExplorer';
import Hero from '@components/Homepage/Hero';
import Navigation from '@components/Navigation';
import styled from 'styled-components';
import GameTrailer from '@components/Homepage/GameTrailer';

export default function Home({ fetchedCustomGamesData, games }) {
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

export const getStaticProps = async () => {
  try {
    const hostname =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://gameportal.savokos.com';

    const [customGamesData, games] = await Promise.all([
      fetch(`${hostname}/customGamesData.json`).then(res => res.json()),
      fetch(
        'https://api.rawg.io/api/games?key=ffc0c5b2524a475993fa130a0f55334c&dates=2020-09-30,2999-01-01&platforms=18,1,7&page_size=28'
      ).then(res => res.json()),
    ]);

    return {
      props: {
        fetchedCustomGamesData: customGamesData,
        games: games.results,
        fallback: false,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`;
