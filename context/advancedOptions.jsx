import { createContext, useContext, useEffect, useState } from 'react';

export const AdvancedOptionsContext = createContext();

const useAdvancedOptions = () => {
  return useContext(AdvancedOptionsContext);
};

export const AdvancedOptionsProvider = ({ children }) => {
  const [storesList, setStoresList] = useState(false);
  const [developersList, setDevelopersList] = useState(false);
  const [tagsList, setTagsList] = useState(false);
  const [publishersList, setPublishersList] = useState(false);
  const [genresList, setGenresList] = useState(false);

  useEffect(() => {
    if (genresList && storesList && tagsList) return;
    return fetchAdvancedOptions();
  }, []);

  const fetchAdvancedOptions = async () => {
    const apiKey = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';
    const [stores, developers, publishers, genres, tags] = await Promise.all([
      fetch(`https://api.rawg.io/api/stores?key=${apiKey}`).then(res =>
        res.json()
      ),
      fetch(`https://api.rawg.io/api/developers?key=${apiKey}`).then(res =>
        res.json()
      ),
      fetch(`https://api.rawg.io/api/publishers?key=${apiKey}`).then(res =>
        res.json()
      ),
      fetch(`https://api.rawg.io/api/genres?key=${apiKey}`).then(res =>
        res.json()
      ),
      fetch(`https://api.rawg.io/api/tags?page_size=40&key=${apiKey}`).then(
        res => res.json()
      ),
    ]);
    setStoresList(stores.results);
    setDevelopersList(developers.results);
    setPublishersList(publishers.results);
    setGenresList(genres.results);
    setTagsList(tags.results);
  };

  const value = {
    stores: storesList,
    developers: developersList,
    publishers: publishersList,
    genres: genresList,
    tags: tagsList,
  };

  return (
    <AdvancedOptionsContext.Provider value={value}>
      {children}
    </AdvancedOptionsContext.Provider>
  );
};

export default useAdvancedOptions;
