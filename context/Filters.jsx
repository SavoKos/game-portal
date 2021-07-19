import { createContext, useContext, useEffect, useState } from 'react';

export const FiltersContext = createContext();

const useFilters = () => {
  return useContext(FiltersContext);
};

export const FiltersProvider = ({ children }) => {
  const apiKey = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';
  const [Order, setOrder] = useState({
    name: 'Relevance',
    value: '-relevance',
  });
  const [Platforms, setPlatforms] = useState('');
  const [ParentPlatforms, setParentPlatforms] = useState('');
  const [Stores, setStores] = useState('');
  const [Developers, setDevelopers] = useState('');
  const [Publishers, setPublishers] = useState('');
  const [Genres, setGenres] = useState('');
  const [Metacritic, setMetacritic] = useState([0, 100]);
  const [games, setGames] = useState(null);
  console.log(Platforms, ParentPlatforms);

  useEffect(async () => {
    const parentPlatformsQuery = ParentPlatforms
      ? `&parent_platforms=${ParentPlatforms?.value}`
      : '';
    const platformsQuery = Platforms ? `&platforms=${Platforms?.value}` : '';
    const finalPlatformsQuery = parentPlatformsQuery || platformsQuery;

    const storesQuery = Stores ? `&stores=${Stores}` : '';
    const developersQuery = Developers ? `&developers=${Developers}` : '';
    const publishersQuery = Publishers ? `&publishers=${Publishers}` : '';
    const genresQuery = Genres ? `&genres=${Genres}` : '';
    const metacriticQuery = Metacritic
      ? `&metacritic=${Metacritic.join(',')}`
      : '';

    const games = await fetch(
      `https://rawg.io/api/games?discover=true&filter=true${finalPlatformsQuery}&ordering=${Order.value}${storesQuery}${developersQuery}${publishersQuery}${genresQuery}${metacriticQuery}&page=1&page_size=40&key=${apiKey}`
    ).then(res => res.json());
    return setGames(games.results);
  }, [
    Order,
    Platforms,
    Stores,
    Developers,
    Publishers,
    Genres,
    Metacritic,
    ParentPlatforms,
  ]);

  const value = {
    Order,
    Platforms,
    ParentPlatforms,
    Stores,
    Developers,
    Publishers,
    Genres,
    Metacritic,
    setOrder,
    setPlatforms,
    setParentPlatforms,
    setStores,
    setDevelopers,
    setPublishers,
    setGenres,
    setMetacritic,
    games,
  };
  console.log(value);

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export default useFilters;
