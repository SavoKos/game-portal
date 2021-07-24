import useFilters from 'context/Filters';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Accordion from './Accordion';
import Metacritic from './Metacritic';

function AdvancedOptions({ style }) {
  const [storesList, setStoresList] = useState(false);
  const [developersList, setDevelopersList] = useState(false);
  const [tagsList, setTagsList] = useState(false);
  const [publishersList, setPublishersList] = useState(false);
  const [genresList, setGenresList] = useState(false);
  const [openedAccordion, setOpenedAccordion] = useState(false);

  const {
    setStores,
    setDevelopers,
    setPublishers,
    setGenres,
    setMetacritic,
    setTags,
  } = useFilters();

  useEffect(async () => {
    const apiKey = process.env.API_KEY || 'ffc0c5b2524a475993fa130a0f55334c';
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
  }, []);

  const toggleAccordion = accordion => {
    setOpenedAccordion(prevAccordion => {
      if (prevAccordion === accordion) return '';
      return accordion;
    });
  };

  return (
    <S.AdvancedOptions className="advanced-options" style={style}>
      <Accordion
        data={storesList}
        title="Stores"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
      <Accordion
        data={developersList}
        title="Developers"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
      <Accordion
        data={publishersList}
        title="Publishers"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
      <Accordion
        data={genresList}
        title="Genres"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
      <Accordion
        data={tagsList}
        title="Tags"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
      <Metacritic
        title="Metacritic"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
    </S.AdvancedOptions>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.AdvancedOptions = styled.div`
  width: 30%;
  border-radius: 0.3rem;
  display: none;
  overflow: hidden;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.primary};

  @media (min-width: 1024px) {
    display: block;
  }
`;

export default AdvancedOptions;
