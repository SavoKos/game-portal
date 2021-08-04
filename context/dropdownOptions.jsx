import { createContext, useContext, useEffect, useState } from 'react';

export const DropdownOptionsContext = createContext();

const useDropdownOptions = () => {
  return useContext(DropdownOptionsContext);
};

export const DropdownOptionsProvider = ({ children }) => {
  const [platformOptions, setPlatformOptions] = useState([]);

  useEffect(() => {
    if (platformOptions.length > 0) return;
    return platformOptionsHandler();
  }, []);

  const orderOptions = [
    { name: 'Relevance', value: '-relevance' },
    { name: 'Date added', value: '-created' },
    { name: 'Name', value: 'name' },
    { name: 'Release date', value: '-released' },
    { name: 'Popularity', value: '-added' },
    { name: 'Average rating', value: '-rating' },
  ];

  const fetchPlatforms = async () => {
    const apiKey = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';
    return await fetch(
      `https://api.rawg.io/api/platforms/lists/parents?key=${apiKey}`
    ).then(res => res.json());
  };

  // remove platforms with no results and make subOptions for playstation and xbox
  const platformOptionsHandler = async () => {
    const fetchedPlatforms = await fetchPlatforms();
    let platformOptions = '';

    if (fetchedPlatforms)
      platformOptions = fetchedPlatforms.results
        ?.filter(
          platform =>
            platform.slug !== 'sega' &&
            platform.slug !== '3do' &&
            platform.slug !== 'commodore-amiga' &&
            platform.slug !== 'neo-geo' &&
            platform.slug !== 'atari'
        )
        .map(platform => {
          if (platform.slug === 'playstation' || platform.slug === 'xbox')
            return {
              name: platform.name,
              value: platform.id,
              subOptions: platform.platforms
                .filter(
                  platform =>
                    platform.slug !== 'playstation3' &&
                    platform.slug !== 'playstation2' &&
                    platform.slug !== 'playstation1' &&
                    platform.slug !== 'psp' &&
                    platform.slug !== 'xbox360' &&
                    platform.slug !== 'xbox-old'
                )
                .map(platform => {
                  return { name: platform.name, value: platform.id };
                }),
            };

          return {
            name: platform.name,
            value: platform.id,
          };
        });

    setPlatformOptions(platformOptions);
  };

  const value = { platformOptions, orderOptions };

  return (
    <DropdownOptionsContext.Provider value={value}>
      {children}
    </DropdownOptionsContext.Provider>
  );
};

export default useDropdownOptions;
