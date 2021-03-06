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
  const [Tags, setTags] = useState('');
  const [Metacritic, setMetacritic] = useState([1, 100]);
  const [games, setGames] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    return fetchGames();
  }, [
    Order,
    Platforms,
    Stores,
    Developers,
    Publishers,
    Genres,
    Metacritic,
    ParentPlatforms,
    Tags,
    page,
  ]);

  const fetchGames = async () => {
    window.scrollTo(0, window.scrollY - 200);

    const parentPlatformsQuery = ParentPlatforms
      ? `&parent_platforms=${ParentPlatforms?.value}`
      : '';
    const platformsQuery = Platforms ? `&platforms=${Platforms?.value}` : '';
    const finalPlatformsQuery = parentPlatformsQuery || platformsQuery;

    const storesQuery = Stores ? `&stores=${Stores}` : '';
    const developersQuery = Developers ? `&developers=${Developers}` : '';
    const tagsQuery = Tags ? `&tags=${Tags}` : '';
    const publishersQuery = Publishers ? `&publishers=${Publishers}` : '';
    const genresQuery = Genres ? `&genres=${Genres}` : '';
    const metacriticQuery = Metacritic
      ? `&metacritic=${Metacritic.join(',')}`
      : '';

    const games = await fetch(
      `https://rawg.io/api/games?discover=true&filter=true${finalPlatformsQuery}&ordering=${Order.value}${storesQuery}${developersQuery}${publishersQuery}${genresQuery}${metacriticQuery}${tagsQuery}&page=${page}&page_size=40&key=${apiKey}`
    ).then((res) => res.json());

    setGames((prevGames) => {
      if (!games?.results) return [];
      if (prevGames === null) return games.results;
      return [...prevGames, ...games.results];
    });
  };

  const clearFilters = () => {
    setGames('');
    setPage(1);
    setStores('');
    setDevelopers('');
    setPublishers('');
    setGenres('');
    setMetacritic([1, 100]);
    setTags('');
    setOrder({
      name: 'Relevance',
      value: '-relevance',
    });
    setPlatforms('');
    setParentPlatforms('');
  };

  const value = {
    Order,
    Platforms,
    ParentPlatforms,
    Stores,
    Developers,
    Publishers,
    Genres,
    Tags,
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
    setGames,
    fetchGames,
    setPage,
    setTags,
    clearFilters,
    page,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export default useFilters;
