import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Icon from '@components/UI/Icon';
import styled from 'styled-components';
import useFilters from 'context/Filters';
import { useState } from 'react';

function Metacritic({ title, toggleAccordion, currentAccordion }) {
  const { setMetacritic, Metacritic, setGames, setPage } = useFilters();
  const [metacriticValue, setMetacriticValue] = useState(
    Metacritic || [1, 100]
  );

  const rangeChangeHandler = value => setMetacriticValue(value);
  const isMetacriticChanged =
    metacriticValue.join(',') !== Metacritic.join(',');

  return (
    <S.Accordion>
      <S.AccordionHead onClick={() => toggleAccordion(title)}>
        <p>
          {title}(
          {isMetacriticChanged
            ? metacriticValue[0] + ',' + metacriticValue[1]
            : Metacritic[0] + ',' + Metacritic[1]}
          )
        </p>
        <Icon type="icon-iov-arrow-down" />
      </S.AccordionHead>
      {currentAccordion === title && (
        <S.AccordionContent>
          <Range
            marks={{
              1: `1`,
              100: `100`,
            }}
            min={1}
            max={100}
            step={1}
            value={metacriticValue}
            defaultValue={[1, 100]}
            onChange={rangeChangeHandler}
          />
          <Icon
            currentMetacritic={Metacritic}
            metacriticValue={metacriticValue}
            className="apply-metacritic"
            type="icon-open_icon_successx"
            onClick={() => {
              setPage(1);
              setGames(null);
              setMetacritic(metacriticValue);
            }}
            style={{
              visibility: isMetacriticChanged ? 'visible' : 'hidden',
            }}
          />
        </S.AccordionContent>
      )}
    </S.Accordion>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.Accordion = styled.div`
  width: 100%;
  color: #fff;
  border-radius: 0 0 0.5rem 0.5rem;
  overflow: hidden;
`;

S.AccordionHead = styled.div`
  padding: 1rem 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  justify-content: space-between;
  transition: all ease 0.3s;
  cursor: pointer;

  .anticon {
    color: #ffffff33;
  }

  p {
    font-size: 1.05rem;
  }

  &:hover {
    filter: brightness(1.5);
  }
`;

S.AccordionContent = styled.div`
  width: 100%;
  background-color: #12102e;
  display: flex;
  align-items: center;

  .apply-metacritic {
    font-size: 1.3rem;
    cursor: pointer;
    margin-right: 0.5rem;
  }

  .rc-slider {
    margin: 1.5rem;
    margin-right: 1rem;
  }
  .rc-slider-track {
    background-color: ${({ theme }) => theme.colors.seaBlue};
  }
`;

export default Metacritic;
