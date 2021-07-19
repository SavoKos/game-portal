import useFilters from 'context/Filters';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Accordion from './Accordion';
import Metacritic from './Metacritic';

function AdvancedOptions({ applyFilters }) {
  const [storesList, setStoresList] = useState(false);
  const [developersList, setDevelopersList] = useState(false);
  const [publishersList, setPublishersList] = useState(false);
  const [genresList, setGenresList] = useState(false);
  const [openedAccordion, setOpenedAccordion] = useState(false);

  const { setStores, setDevelopers, setPublishers, setGenres, setMetacritic } =
    useFilters();

  useEffect(async () => {
    const apiKey = process.env.API_KEY || 'ffc0c5b2524a475993fa130a0f55334c';
    const [stores, developers, publishers, genres] = await Promise.all([
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
    ]);
    setStoresList(stores.results);
    setDevelopersList(developers.results);
    setPublishersList(publishers.results);
    setGenresList(genres.results);
  }, []);

  const clearFilters = () => {
    setStores('');
    setDevelopers('');
    setPublishers('');
    setGenres('');
    setMetacritic('');
  };

  return (
    <S.AdvancedOptions>
      <Accordion
        data={storesList}
        title="Stores"
        currentAccordion={openedAccordion}
        openAccordion={setOpenedAccordion}
      />
      <Accordion
        data={developersList}
        title="Developers"
        currentAccordion={openedAccordion}
        openAccordion={setOpenedAccordion}
      />
      <Accordion
        data={publishersList}
        title="Publishers"
        currentAccordion={openedAccordion}
        openAccordion={setOpenedAccordion}
      />
      <Accordion
        data={genresList}
        title="Genres"
        currentAccordion={openedAccordion}
        openAccordion={setOpenedAccordion}
      />
      <Metacritic
        title="Metacritic"
        currentAccordion={openedAccordion}
        openAccordion={setOpenedAccordion}
      />
    </S.AdvancedOptions>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.AdvancedOptions = styled.div`
  width: 30%;
  border-radius: 0.5rem;
  display: none;
  overflow: hidden;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.primary};

  @media (min-width: 1024px) {
    display: block;
  }
`;

export default AdvancedOptions;
