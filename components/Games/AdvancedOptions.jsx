import useAdvancedOptions from 'context/advancedOptions';
import { useState } from 'react';
import styled from 'styled-components';
import Accordion from './Accordion';
import Metacritic from './Metacritic';

function AdvancedOptions({ style }) {
  const [openedAccordion, setOpenedAccordion] = useState(false);
  const { stores, developers, genres, tags, publishers } = useAdvancedOptions();

  const toggleAccordion = accordion => {
    setOpenedAccordion(prevAccordion => {
      if (prevAccordion === accordion) return '';
      return accordion;
    });
  };

  return (
    <S.AdvancedOptions className="advanced-options" style={style}>
      <Accordion
        data={stores}
        title="Stores"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
      <Accordion
        data={developers}
        title="Developers"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
      <Accordion
        data={publishers}
        title="Publishers"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
      <Accordion
        data={genres}
        title="Genres"
        currentAccordion={openedAccordion}
        toggleAccordion={toggleAccordion}
      />
      <Accordion
        data={tags}
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
