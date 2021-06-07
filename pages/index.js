import FeaturedGames from '@components/Homepage/FeaturedGames';
import GameExplorer from '@components/Homepage/GameExplorer';
import Hero from '@components/Homepage/Hero';
import Navigation from '@components/Navigation';
import axios from 'axios';
import { useEffect } from 'react';

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://api.rawg.io/api/games?key=ffc0c5b2524a475993fa130a0f55334c&page_size=5'
  );
  const data = await res.json();

  return {
    props: { featured: data.results },
  };
};

export default function Home({ featured }) {
  console.log(featured);

  return (
    <div className="bg-primary">
      <Navigation />
      <Hero />
      <FeaturedGames games={featured} />
      <GameExplorer />
    </div>
  );
}
