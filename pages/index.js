import FeaturedGames from '@components/Homepage/FeaturedGames';
import GameExplorer from '@components/Homepage/GameExplorer';
import Hero from '@components/Homepage/Hero';
import Navigation from '@components/Navigation';
import axios from 'axios';

// export const getInitialProps = async () => {
//   // featured games
//   const gameRes = await fetch(
//     'https://api.rawg.io/api/games?key=ffc0c5b2524a475993fa130a0f55334c'
//   );
//   const gameData = await gameRes.json();

//   return {
//     props: {
//       games: gameData.results,
//     },
//   };
// };

const fetchData = async () =>
  await axios
    .get(
      'https://api.rawg.io/api/games?key=ffc0c5b2524a475993fa130a0f55334c&page_size=20'
    )
    .then(res => ({
      error: false,
      games: res.data.results,
    }))
    .catch(() => ({
      error: true,
      games: null,
    }));

export default function Home({ games, error }) {
  console.log(games);
  return (
    <div className="bg-primary">
      <Navigation />
      <Hero />
      <FeaturedGames games={games} />
      <GameExplorer games={games} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: data,
  };
};
