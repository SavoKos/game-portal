import FeaturedGames from '@components/Homepage/FeaturedGames';
import GameExplorer from '@components/Homepage/GameExplorer';
import Hero from '@components/Homepage/Hero';
import Navigation from '@components/Navigation';
import { useEffect, useState } from 'react';

const fetchData = async () => {
  try {
    const [gta, games] = await Promise.all([
      fetch('gtavdata.json').then(res => res.json()),
      fetch(
        'https://api.rawg.io/api/games?key=ffc0c5b2524a475993fa130a0f55334c&metacritic=80,100&dates=2015-01-01,2999-01-01'
      ).then(res => res.json()),
    ]);

    const gamesResults = games.results;
    return { gta, games: gamesResults };
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  const [gtaData, setGtaData] = useState({});
  const [gamesData, setGamesData] = useState([]);
  useEffect(async () => {
    const { gta, games } = await fetchData();
    console.log(gta, games);
    setGtaData(gta);
    setGamesData(games);
  }, []);
  return (
    <div className="bg-primary">
      <Navigation />
      <Hero />
      <FeaturedGames games={gamesData} />
      <GameExplorer games={gamesData} gta={gtaData} />
    </div>
  );
}
